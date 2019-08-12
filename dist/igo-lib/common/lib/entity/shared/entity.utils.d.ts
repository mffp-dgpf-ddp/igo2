import { EntityKey } from './entity.interfaces';
/**
 * Get an entity's named property. Nested properties are supported
 * with the dotted notation. (i.e 'author.name')
 *
 * Note: this method is a 'best attempt' at getting an entity's property.
 * It fits the most common cases but you might need to explicitely define
 * a property getter when using an EntityStore, for example.
 * @param entity Entity
 * @param property Property name
 * @returns Property value
 */
export declare function getEntityProperty(entity: object, property: string): any;
/**
 * Get an entity's id. An entity's id can be one of:
 * 'entity.meta.id', 'entity.meta.idProperty' or 'entity.id'.
 *
 * Note: See the note in the 'getEntityProperty' documentation.
 * @param entity Entity
 * @returns Entity id
 */
export declare function getEntityId(entity: object): EntityKey;
/**
 * Get an entity's title. An entity's title can be one of:
 * 'entity.meta.title', 'entity.meta.titleProperty' or 'entity.title'.
 * @param entity Entity
 * @returns Entity title
 */
export declare function getEntityTitle(entity: object): string;
/**
 * Get an entity's HTML title. An entity's HTML title can be one of:
 * 'entity.meta.titleHtml', 'entity.meta.titleHtmlProperty' or 'entity.titleHtml'.
 * @param entity Entity
 * @returns Entity HTML title
 */
export declare function getEntityTitleHtml(entity: object): string;
/**
 * Get an entity's icon. An entity's icon can be one of:
 * 'entity.meta.icon', 'entity.meta.iconProperty' or 'entity.icon'.
 * @param entity Entity
 * @returns Entity icon
 */
export declare function getEntityIcon(entity: object): string;
/**
 * Get an entity's revision.
 * @param entity Entity
 * @returns Entity revision
 */
export declare function getEntityRevision(entity: object): number;
