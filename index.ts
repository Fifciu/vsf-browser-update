import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { isServer } from '@vue-storefront/core/helpers'

const repositoryUrl = 'https://github.com/Fifciu/vsf-browser-update';

export const BrowserUpdateModule: StorefrontModule = async ({ appConfig }) => {
  if (!isServer && appConfig.browserUpdate && appConfig.browserUpdate.enabled) {
    try {
      const browserUpdate = (await import('browser-update')).default;
      browserUpdate(appConfig.browserUpdate.configuration)
    } catch (e) {
      console.error(`[VSF-Browser-Update] browser-update package probably changed export signature. Update module to the newest version or create an issue: ${repositoryUrl}`)
    }
  }
}
