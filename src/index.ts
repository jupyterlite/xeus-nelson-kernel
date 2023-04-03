// Copyright (c) QuantStack
// Copyright (c) JupyterLite Contributors
// Distributed under the terms of the Modified BSD License.

import {
  IServiceWorkerManager,
  JupyterLiteServer,
  JupyterLiteServerPlugin
} from '@jupyterlite/server';
import { IBroadcastChannelWrapper } from '@jupyterlite/contents';
import { IKernel, IKernelSpecs } from '@jupyterlite/kernel';

import { WebWorkerKernel } from './web_worker_kernel';

import logo32 from '!!file-loader?context=.!../style/logos/nelson-logo-32x32.png';
import logo64 from '!!file-loader?context=.!../style/logos/nelson-logo-64x64.png';

const server_kernel: JupyterLiteServerPlugin<void> = {
  id: '@jupyterlite/xeus-nelson-kernel-extension:kernel',
  autoStart: true,
  requires: [IKernelSpecs],
  optional: [IServiceWorkerManager, IBroadcastChannelWrapper],
  activate: (
    app: JupyterLiteServer,
    kernelspecs: IKernelSpecs,
    serviceWorker?: IServiceWorkerManager,
    broadcastChannel?: IBroadcastChannelWrapper
  ) => {
    kernelspecs.register({
      spec: {
        name: 'Nelson',
        display_name: 'Nelson',
        language: 'nelson',
        argv: [],
        resources: {
          'logo-32x32': logo32,
          'logo-64x64': logo64
        }
      },
      create: async (options: IKernel.IOptions): Promise<IKernel> => {
        return new WebWorkerKernel({
          ...options,
          mountDrive: false
        });
      }
    });
  }
};

const plugins: JupyterLiteServerPlugin<any>[] = [server_kernel];

export default plugins;
