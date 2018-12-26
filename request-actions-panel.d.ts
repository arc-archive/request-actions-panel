/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   request-actions-panel.html
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../paper-icon-button/paper-icon-button.d.ts" />
/// <reference path="../iron-flex-layout/iron-flex-layout.d.ts" />
/// <reference path="../arc-icons/arc-icons.d.ts" />
/// <reference path="../paper-button/paper-button.d.ts" />
/// <reference path="../variables-consumer-mixin/variables-consumer-mixin.d.ts" />
/// <reference path="request-action-editor.d.ts" />
/// <reference path="request-variable-editor.d.ts" />

declare namespace UiElements {

  /**
   * A panel to create and edit request actions.
   *
   * ### Example
   *
   * ```html
   * <request-actions-panel actions="{{requestActions}}"></request-actions-panel>
   * ```
   *
   * ## Action data model
   *
   * Action can be defined using following properties:
   *
   * **source** (`String`)
   *
   * Source of the data to extract from the request or response object. See section
   * below for detailed description.
   *
   * **action** (`String`)
   *
   * Action to perform. Currently supported are: `assign-variable` - updates
   * variable value in memory, without storing them to the datastore;
   * `store-variable` - updates and stores variable value in the datastore.
   *
   *
   * **destination** (`String`)
   *
   * For variables manipulation it is the variable name.
   *
   *
   * **enabled** (`Boolean`)
   *
   * If sent to false then the action is ignored.
   *
   * ### Source option and data path
   *
   * With source string you can instruct the runner from where to take the value for
   * action. General structure is:
   *
   * ```
   * source object . data type [. path]
   * ```
   *
   * Source object can be either `request` or `response`.
   *
   * Data type describes type of the request / response data. Can be one of:
   * - url - URL associated with the request / response
   * - status - Only for response data source object. Response's status code.
   * - header - Request / response headers
   * - body - Request / response body
   *
   * Path allows to instruct the runner from where specifically in the data type get the value.
   *
   * For `url` you can define the following properties:
   * - host - Returns the host value, e.g. `api.domain.com`
   * - protocol - Returns URL protocol, e.g. `https:`
   * - path - URL's path, e.g. `/path/to/resource.json`
   * - query - Returns full query string, e.g. `version=1&page=test`
   * - query.[any string] - Returns the value of a query parameter. For
   * `query.version` it would return `1`
   * - hash - Returns everything that is after the `#` character, e.g.
   * `access_token=token&state=A6RT7W`
   * - hast.[any string] - It treats hash as a query parameters and returns
   * the value of the parameter. For `hash.access_token` it would return `token`
   *
   * For `body` you can define path to the value for XML and JSON data only.
   * Any other content type will result with `undefined` value.
   *
   * Path to the data is a JSON path to the value (also for XML).
   *
   * ```javascript
   * const json = {
   *   property: {
   *     otherProperty: {
   *       value: 123456
   *     }
   *   }
   * };
   * const path = 'property.otherProperty.value';
   * // This will return 123456
   * ```
   *
   * To access array values put the index in the path:
   *
   * ```javascript
   * const json = {
   *   items: [{
   *     otherProperty: {
   *       value: 123456
   *     }
   *   }]
   * };
   * const path = 'items.0.otherProperty.value';
   * // This will return 123456
   * ```
   *
   * Similar for XML:
   *
   * ```javascript
   * const xmlStr = `<?xml version="1.0"?>
   * <people xmlns:xul="some.xul">
   *   <person db-id="test1">
   *     <name first="george" last="bush" />
   *     <address street="1600 pennsylvania avenue" city="washington" country="usa"/>
   *     <phoneNumber>202-456-1111</phoneNumber>
   *   </person>
   *   <person db-id="test2">
   *     <name first="tony" last="blair" />
   *     <address street="10 downing street" city="london" country="uk"/>
   *     <phoneNumber>020 7925 0918</phoneNumber>
   *   </person>
   * </people>`;
   * path = 'people.person.0.phoneNumber';
   * // returns 202-456-1111
   * ```
   *
   * XML path supports `attr(ATTRIBUTE NAME)` function that returns the value of the
   * attribute:
   *
   * ```javascript
   * path = 'people.person.0.name.attr(first)';
   * // returns george
   * ```
   *
   * ## Conditions
   *
   * You can add a condition to the action so the action will be executed if all conditions are meet.
   *
   * Condition data model is:
   * ```javascript
   * {
   *   source: 'String', // the same as for action
   *   operator: 'String', // see below for list of all operators
   *   condition: 'any', // value to use to compare the value get from the action `source` property
   *   enabled: 'Boolean' // false to ignore the condition.
   * }
   * ```
   *
   * Operator can be one of:
   * - equal
   * - not-equal
   * - greater-than
   * - greater-than-equal
   * - less-than
   * - less-than-equal
   * - contains
   *
   * Contains can operate on strings, simple arrays (e.g. `['test', 123]`)
   * or objects (e.g. {'key':'value'}).
   *
   * ### Example
   *
   * ```javascript
   * const config = {
   *   source: 'request.body.items.0.name',
   *   action: 'assign-variable',
   *   destination: 'someValue',
   *   enabled: true,
   *   conditions: [{
   *     source: 'response.status',
   *     operator: 'equal',
   *     condition: 200,
   *     enabled: true
   *   }]
   * }
   * ```
   *
   * ## Iterables
   *
   * Value for action can be extracted from the response body after iteraiting over
   * iterable data types (array, object). In this case action's `source` property
   * should be relative to the object that matches ierator definition.
   *
   * Iterables can be mixed with conditions. Conditions are checked first, before
   * action is performed.
   *
   * ### Example
   *
   * Getting value from the same object.
   *
   * ```javascript
   * // Action configuration
   * const config = {
   *   source: 'id',
   *   action: 'assign-variable',
   *   destination: 'personId',
   *   iterator: {
   *     source: 'items.*.name',
   *     operator: 'equal',
   *     condition: 'Smith'
   *   }
   * }
   * // Response
   * const response = {
   *   items: [{
   *     id: 1234,
   *     name: 'Brown'
   *   }, {
   *     id: 5678,
   *     name: 'Smith'
   *   }]
   * }
   * ```
   * Result of the above model would result with assigning `5678` to `personId` variable.
   *
   * ### Styling
   *
   * `<request-actions-panel>` provides the following custom properties and mixins for styling:
   *
   * Custom property | Description | Default
   * ----------------|-------------|----------
   * `--request-actions-panel` | Mixin applied to the element | `{}`
   * `--request-actions-panel-title` | Mixin applied to the title element. | `{}`
   * `--request-actions-panel-empty-screen-color` | Color of the empty screen | `#707070`
   */
  class RequestActionsPanel extends
    ArcComponents.VariablesConsumerMixin(
    Object) {

    /**
     * Model for actions to be preformed after the request
     */
    afterActions: any[]|null|undefined;

    /**
     * Model for actions to be preformed before the request
     */
    beforeActions: any[]|null|undefined;

    /**
     * If true then the panel has actions defined.
     */
    readonly hasPostActions: boolean|null|undefined;

    /**
     * If true then the panel has pre-actions defined.
     */
    readonly hasPreActions: boolean|null|undefined;

    /**
     * Indicates if any action has been defined for this request.
     */
    readonly hasActions: boolean|null|undefined;

    /**
     * Renders the editor in read only mode
     */
    readonly: boolean|null|undefined;
    readonly _variables: any[]|null|undefined;

    /**
     * Opens documentation page for the module.
     *
     * @returns reference to newly created window if not
     * handled by `open-external-url` event.
     */
    _seekHelp(): Window|null|undefined;

    /**
     * Computes value for `hasPostActions` based on post actions.
     *
     * @param value Current post actions
     */
    _afterActionsChanged(value: any[]|null|undefined): void;

    /**
     * Computes value for `hasPreActions` based on pre actions.
     *
     * @param value Current pre actions
     */
    _beforeActionsChanged(value: any[]|null|undefined): void;

    /**
     * Computes value for `hasActions` propety.
     *
     * @param hasPostActions Current value of hasPostActions
     * @param hasPreActions Current value of hasPreActions
     * @returns True if any action is defined.
     */
    _computeHasActions(hasPostActions: Boolean|null, hasPreActions: Boolean|null): Boolean|null;
    _addPostActionHandler(): void;
    _addPreActionHandler(): void;

    /**
     * Adds a post action to the UI.
     *
     * @param opts Default values for model.
     */
    addPostAction(opts: object|null): void;

    /**
     * Adds a pre action to the UI
     *
     * @param opts Default values for model.
     */
    addPreAction(opts: object|null): void;
    _removePostItem(e: any): void;
    _removePreItem(e: any): void;

    /**
     * Filters out variables that can't be used in the editor and returns
     * a list of variable names.
     *
     * @param record Change record for variables
     * @returns List of filtered variable names.
     */
    _processVariables(record: object|null): Array<String|null>|null;
  }
}

interface HTMLElementTagNameMap {
  "request-actions-panel": UiElements.RequestActionsPanel;
}
