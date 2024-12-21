import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { appConfig } from './app.config';
 
const serverConfig: ApplicationConfig = {
  providers: [
    provideClientHydration()
  ]
};
 
export const config = mergeApplicationConfig(appConfig, serverConfig);
 
 