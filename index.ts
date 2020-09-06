import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { isServer } from '@vue-storefront/core/helpers'

const repositoryUrl = 'https://github.com/Fifciu/vsf-browser-update';

export const BrowserUpdateModule: StorefrontModule = async ({ appConfig, moduleConfig }) => {
  if (!isServer && appConfig.browserUpdate && appConfig.browserUpdate.enabled) {
    try {
      const browserUpdate = (await import('browser-update')).default;
      browserUpdate({
        ...appConfig.browserUpdate.configuration,
        ...moduleConfig,
        ...(moduleConfig && typeof moduleConfig.container === 'function' ? { container: moduleConfig.container() } : {})
      })
    } catch (e) {
      console.error(`[VSF-Browser-Update] browser-update package probably changed export signature. Update module to the newest version or create an issue: ${repositoryUrl}`)
    }
  }
}
