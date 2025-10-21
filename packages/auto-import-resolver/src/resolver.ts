import type { ComponentResolver } from 'unplugin-vue-components';
import type { FilterPattern } from 'unplugin-utils';
import { WEB_COMPONENT_MAP, MOBILE_COMPONENT_MAP, CHAT_COMPONENT_MAP } from './components';

import icons from './icons.json';
import { isExclude, hyphenate } from './utils';

export type TDesignLibrary = 'vue' | 'vue-next' | 'mobile-vue' | 'chat' | 'uniapp';

export interface TDesignResolverOptions {
  /**
   * select the specified library
   * @default 'uniapp'
   */
  library?: TDesignLibrary;

  /**
   * resolve `tdesign-icons'
   * @default false
   */
  resolveIcons?: boolean;

  /**
   * whether to import ESM version
   * @default false
   */
  esm?: boolean;

  /**
   * exclude component name, if match do not resolve the name
   *
   */
  exclude?: FilterPattern;
}

function getImportFrom(options: TDesignResolverOptions = {}, importName: string) {
  if (options.library !== 'uniapp') {
    return options.esm ? '/esm' : '';
  }

  const name = importName === 'QRCode' ? 'qrcode' : hyphenate(importName);

  return `/${name}/${name}.vue`;
}

export function TDesignResolver(options: TDesignResolverOptions = {}): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      const { library = 'uniapp', exclude } = options;
      const importFrom = getImportFrom(options, name);

      if (isExclude(name, exclude)) return;

      if (options.resolveIcons && icons.includes(name)) {
        if (library === 'uniapp') {
          return;
        }

        return {
          name,
          from: `${resolveIconPkg(library)}${importFrom}`,
        };
      }
      const componentMap = resolveComponentMap(library);

      let isTDesignComponent = false;
      const importName = resolveImportName(name);

      if (!importName) return;

      for (const key in componentMap) {
        if (componentMap[key].includes(importName)) {
          isTDesignComponent = true;
          break; // 找到后立即退出循环
        }
      }
      if (isTDesignComponent) {
        const importFrom = getImportFrom(options, importName);
        const info = library === 'uniapp' ? {
          name: 'default',
          as: importName,
        } : {
          name: importName,
        };
        return {
          ...info,
          from: `${resolveComponentPkg(library)}${importFrom}`,
        };
      }
    },
  };
}

function resolveImportName(name: string) {
  if (name.endsWith('Plugin')) {
    return name;
  }
  if (!name.startsWith('T')) {
    return '';
  }
  const componentName = name.slice(1);
  if (componentName === 'Qrcode') {
    return 'QRCode';
  }
  if (componentName.startsWith('Typography')) {
    return componentName.slice('Typography'.length);
  }
  return componentName;
}

function resolveIconPkg(library: TDesignLibrary): string {
  if (library === 'chat' || library === 'mobile-vue') {
    return 'tdesign-icons-vue-next';
  }

  return `tdesign-icons-${library}`;
}
function resolveComponentPkg(library: TDesignLibrary): string {
  if (library === 'chat') {
    return '@tdesign-vue-next/chat';
  }
  return `tdesign-${library}`;
}

function resolveComponentMap(library: TDesignLibrary): Record<string, string[]> {
  if (['vue', 'vue-next'].includes(library)) {
    return WEB_COMPONENT_MAP;
  }
  if (['mobile-vue', 'uniapp'].includes(library)) {
    return MOBILE_COMPONENT_MAP;
  }
  if (library === 'chat') {
    return CHAT_COMPONENT_MAP;
  }

  return {};
}
