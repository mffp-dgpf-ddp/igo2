// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { AuthOptions } from '@igo2/auth';
import { ContextServiceOptions } from '@igo2/context';
import { LanguageOptions } from '@igo2/core';
import { SearchSourceOptions, CatalogServiceOptions } from '@igo2/geo';

export interface Environment {
  production: boolean;
  igo: {
    searchSources?: { [key: string]: SearchSourceOptions };
    language?: LanguageOptions;
    auth?: AuthOptions;
    context?: ContextServiceOptions;
    catalog?: CatalogServiceOptions;
  };
}

export const environment: Environment = {
  production: false,
  igo: {
    auth: {
      url: '/apis/users',
      tokenKey: 'id_token_igo',
      allowAnonymous: true
    },
    searchSources: {
      nominatim: {
        available: false
      },
      icherche: {
        searchUrl: '/icherche/geocode',
        params: {
          limit: '8'
        }
      },
      icherchereverse: {
        searchUrl: '/icherche/xy',
        params: {
          limit: '5'
        }
      },
      ilayer: {
        searchUrl: '/apis/layers/search',
        params: {
          limit: '5'
        }
      }
    },
    language: {
      prefix: './locale/'
    }
  }
};
