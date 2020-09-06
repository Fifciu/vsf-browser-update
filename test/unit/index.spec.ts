import { BrowserUpdateModule } from '../../index'
import { Store } from 'vuex'
import VueRouter from 'vue-router';
import Vue from 'vue';
import RootState from '@vue-storefront/core/types/RootState';
import browserUpdate from 'browser-update';

jest.mock('@vue-storefront/core/helpers', () => ({
  isServer: false
}));

jest.mock('browser-update', () => jest.fn());

const consoleMock = {
  error: jest.fn(),
  log: jest.fn(),
  warn: jest.fn()
}

Object.defineProperty(window, 'console', { value: consoleMock });

const getMockedModuleOptions = () => {
  const emptyObject = {};

  return {
    app: new Vue(),
    store: (emptyObject as Store<RootState>),
    router: (emptyObject as VueRouter),
    moduleConfig: {}
  }
}

describe('BrowserUpdateModule', () => {
  it('does nothing client side when not enabled', async () => {
    await BrowserUpdateModule({
      ...getMockedModuleOptions(),
      appConfig: {
        browserUpdate: {
          enabled: false
        }
      }
    });

    expect(browserUpdate).not.toHaveBeenCalled();
  })

  it('calls browserUpdate client side even if config not provided', async () => {
    const configuration = {
      a: 1,
      b: 234,
      c: '213123'
    };

    await BrowserUpdateModule({
      ...getMockedModuleOptions(),
      appConfig: {
        browserUpdate: {
          enabled: true
        }
      }
    });

    expect(browserUpdate).toHaveBeenCalledWith({});
  })

  it('calls browserUpdate client side if enabled with proper argument from .json config', async () => {
    const configuration = {
      a: 1,
      b: 234,
      c: '213123'
    };

    await BrowserUpdateModule({
      ...getMockedModuleOptions(),
      appConfig: {
        browserUpdate: {
          enabled: true,
          configuration
        }
      }
    });

    expect(browserUpdate).toHaveBeenCalledWith(configuration);
  })

  it('calls browserUpdate client side if enabled with proper argument from client.ts config', async () => {
    const moduleConfig = {
      a: 1,
      b: 234,
      c: '213123'
    };

    await BrowserUpdateModule({
      ...getMockedModuleOptions(),
      appConfig: {
        browserUpdate: {
          enabled: true
        }
      },
      moduleConfig
    });

    expect(browserUpdate).toHaveBeenCalledWith(moduleConfig);
  })

  it('calls container function if provided', async () => {
    const expectValue = 1234343;
    const moduleConfig = {
      container: jest.fn(() => expectValue)
    };

    await BrowserUpdateModule({
      ...getMockedModuleOptions(),
      appConfig: {
        browserUpdate: {
          enabled: true
        }
      },
      moduleConfig
    });

    expect(moduleConfig.container).toHaveBeenCalled();
    expect(browserUpdate).toHaveBeenCalledWith({
      ...moduleConfig,
      container: expectValue
    });
  })

  it('prints console error if browserUpdate throws an error', async () => {
    browserUpdate.mockImplementation(() => {
      throw new Error('err')
    })

    await BrowserUpdateModule({
      ...getMockedModuleOptions(),
      appConfig: {
        browserUpdate: {
          enabled: true
        }
      }
    });

    expect(consoleMock.error).toHaveBeenCalled();
  })
})
