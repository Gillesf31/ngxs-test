import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import {NgxsModule} from "@ngxs/store";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {TodoState} from "./todos/todo.state";
import {AnimalState} from "./animals/animals.state";

export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
      importProvidersFrom(
          NgxsModule.forRoot([TodoState, AnimalState], {developmentMode: true, selectorOptions: {suppressErrors: false, injectContainerState: false}}),
          NgxsReduxDevtoolsPluginModule.forRoot()
      ),
  ],
};
