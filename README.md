# Vue Storefront Browser Update
PWA Module
![Preview](https://user-images.githubusercontent.com/30155292/92304237-6eac7300-ef7c-11ea-8ecb-eadc51d90845.png)

It is wrapper for: https://github.com/browser-update/browser-update

## Requirements
- Vue Storefront 1.11+

## How to install
1. Clone repository to src/modules of your PWA with SSH or HTTPS:
```sh
# With SSH
git clone git@github.com:Fifciu/vsf-browser-update.git src/modules/vsf-browser-update;
# With HTTPS
git clone https://github.com/Fifciu/vsf-browser-update.git src/modules/vsf-browser-update;
```

2. Import & register module in `src/modules/client.ts`:
```ts
import { BrowserUpdateModule } from './vsf-browser-update';

// ...
export function registerClientModules () {
  // ...
  registerModule(BrowserUpdateModule)
  // ...
}
```

3. In your `config/local.json` add:
```js
"browserUpdate": {
    "enabled": true
}
```

4. That's all. To test if everything went well - run app with `yarn dev` and append to the end of url `#test-bu` phrase. It will force popup to show.

## How to customize

In your `config/local.json` you can use `configuration` option:
```js
"browserUpdate": {
    "enabled": true,
    "configuration": {
        // Your config
    }
}
```

[List of attributes can be found there](http://browser-update.org/customize.html)

As configuration is inside JSON, it does not support these attributes:
- `container`
- `onshow`
- `onclick`
- `onclose`

If you want to customize CSS - just use `#buorg` identifier. It is easier to use it because when you use `.buorg` class it will have same power as default ones and default ones will overwrite it. It is also important to do not use `scoped` stylings for that purpose.

## Todo
- [ ] Add support for all attributes
