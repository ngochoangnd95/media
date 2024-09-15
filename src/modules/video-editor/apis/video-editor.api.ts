import { Validate } from '@/decorators';
import { extractPath } from '@/utils';
import { EventEmitter } from 'events';
import { ZodError } from 'zod';
import { FfmpegEvent, ProcessEvent, Rotate } from '../constants';
import ffmpeg from '../libs/ffmpeg';
import {
  editSchema,
  mergeSchema,
  takeScreenshotSchema,
  trimBlankBorderSchema,
} from '../schemas/video-editor.schema';
import {
  EditParams,
  MergeParams,
  TakeScreenshotParams,
  TrimBlankBorderParams,
} from '../types/video-editor.type';

export class VideoEditorApi {
  emitter: EventEmitter;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
  }

  @Validate(editSchema)
  edit(params: EditParams) {
    try {
      const { input, startTime, endTime, crop, rotate, flip, destination } = params;

      const command = ffmpeg(input);
      if (startTime) {
        command.setStartTime(startTime);
      }
      if (endTime) {
        command.inputOption(`-to ${endTime}`);
      }
      if (crop) {
        command.videoFilter(`crop=${crop}`);
      }
      if (rotate) {
        switch (rotate) {
          case Rotate.D90:
            command.videoFilter('transpose=1');
            break;
          case Rotate.D180:
            command.videoFilter(['transpose=1', 'transpose=1']);
            break;
          case Rotate.D270:
            command.videoFilter('transpose=2');
            break;
          default:
            break;
        }
      }
      if (flip) {
        command.videoFilter(flip);
      }

      command.on(ProcessEvent.Start, (commandLine) => {
        this.emitter.emit(ProcessEvent.Start, FfmpegEvent.Edit, { commandLine });
      });
      command.on(ProcessEvent.End, () => {
        this.emitter.emit(ProcessEvent.End, FfmpegEvent.Edit);
      });
      command.on(ProcessEvent.Error, (error, stdout, stderr) => {
        this.emitter.emit(ProcessEvent.Error, FfmpegEvent.Edit, { error, stdout, stderr });
      });

      command.saveToFile(destination);
    } catch (error) {
      if (error instanceof ZodError) {
        this.emitter.emit(ProcessEvent.Error, FfmpegEvent.Edit, {
          type: 'validation_error',
          error: error.errors,
        });
      }
    }
  }

  @Validate(mergeSchema)
  merge(params: MergeParams) {
    try {
      const { inputs, destination } = params;

      const command = ffmpeg();
      inputs.forEach((input) => {
        command.input(input);
      });

      command.on(ProcessEvent.Start, (commandLine) => {
        this.emitter.emit(ProcessEvent.Start, FfmpegEvent.Merge, { commandLine });
      });
      command.on(ProcessEvent.End, () => {
        this.emitter.emit(ProcessEvent.End, FfmpegEvent.Merge);
      });
      command.on(ProcessEvent.Error, (error, stdout, stderr) => {
        this.emitter.emit(ProcessEvent.Error, FfmpegEvent.Merge, { error, stdout, stderr });
      });

      command.mergeToFile(destination, extractPath(destination).dirname);
    } catch (error) {
      if (error instanceof ZodError) {
        this.emitter.emit(ProcessEvent.Error, FfmpegEvent.Merge, {
          type: 'validation_error',
          error: error.errors,
        });
      }
    }
  }

  @Validate(takeScreenshotSchema)
  takeScreenshot(params: TakeScreenshotParams) {
    try {
      const { input, destination, timestamps } = params;

      const command = ffmpeg(input);

      command.on(ProcessEvent.Start, (commandLine) => {
        this.emitter.emit(ProcessEvent.Start, FfmpegEvent.TakeScreenshot, { commandLine });
      });
      command.on(ProcessEvent.End, () => {
        this.emitter.emit(ProcessEvent.End, FfmpegEvent.TakeScreenshot);
      });
      command.on(ProcessEvent.Error, (error, stdout, stderr) => {
        this.emitter.emit(ProcessEvent.Error, FfmpegEvent.TakeScreenshot, {
          error,
          stdout,
          stderr,
        });
      });

      command.screenshots({
        folder: destination,
        filename: '%f_SHOT[%ss]',
        timestamps,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        this.emitter.emit(ProcessEvent.Error, FfmpegEvent.TakeScreenshot, {
          type: 'validation_error',
          error: error.errors,
        });
      }
    }
  }

  @Validate(trimBlankBorderSchema)
  trimBlankBorder(params: TrimBlankBorderParams) {
    try {
      const { input } = params;

      const command = ffmpeg(input);
      command.frames(10).videoFilter('cropdetect').addOption('-f null');

      command.on(ProcessEvent.Start, (commandLine) => {
        this.emitter.emit(ProcessEvent.Start, FfmpegEvent.TrimBlankBorder, { commandLine });
      });
      command.on(ProcessEvent.End, (_, stderr: string | null) => {
        if (!stderr) return;
        const cropParam = stderr.match(/crop=\d+:\d+:\d+:\d+/g)?.pop();
        this.emitter.emit(ProcessEvent.End, FfmpegEvent.TrimBlankBorder, {
          cropParam: cropParam?.slice(5),
        });
      });
      command.on(ProcessEvent.Error, (error, stdout, stderr) => {
        this.emitter.emit(ProcessEvent.Error, FfmpegEvent.TrimBlankBorder, {
          error,
          stdout,
          stderr,
        });
      });

      command.output('-').run();
    } catch (error) {
      if (error instanceof ZodError) {
        this.emitter.emit(ProcessEvent.Error, FfmpegEvent.TrimBlankBorder, {
          type: 'validation_error',
          error: error.errors,
        });
      }
    }
  }
}
