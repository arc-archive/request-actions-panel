/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../@advanced-rest-client/arc-icons/arc-icons.js';
import '../../@polymer/paper-button/paper-button.js';
import '../../@polymer/paper-input/paper-input.js';
import '../../@polymer/paper-toggle-button/paper-toggle-button.js';
import '../../@polymer/paper-dropdown-menu/paper-dropdown-menu-light.js';
import '../../@polymer/paper-listbox/paper-listbox.js';
import '../../@polymer/paper-item/paper-item.js';
import '../../@advanced-rest-client/paper-combobox/paper-combobox.js';
import '../../@polymer/iron-collapse/iron-collapse.js';
import '../../@polymer/paper-styles/shadow.js';
import './request-condition-editor.js';
import './request-action-iterator-editor.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
/**
 * Request action editor. Allows to build data model for request action using convinient UI.
 *
 * ## Element use example
 *
 * ```
 * <request-action-editor action="{{action}}" opened></request-action-editor>
 * ```
 *
 * ## Action data model
 *
 * Action can be defined using following properties:
 *
 * | Property | Type | Description |
 * | ----- | ----- | ----- |
 * | source | `String` | Source of the data to extract from the request or response object. See below this table for detailed description. |
 * | action | `String` | Action to perform. Currently supported are: `assign-variable` -updates variable value in memory, without storing them to the datastore; `store-variable` - updates and stores variable value in the datastore.
 * | destination | `String` | For variables manipulation it is the variable name. |
 * | enabled | `Boolean` | If sent to false then the action is ignored. |
 *
 * ### Source option and data path
 *
 * With source string you can instruct the runner from where to take the value for
 * action. General structure is:
 *
 * ```
 * source object . data type [. pRequest action editor. Allows to build data model for request action using
 * convinient UI.
 *
 * ## Element use example
 *
 * ```
 * <request-action-editor action="{{action}}" opened></request-action-editor>
 * ```
 *
 * ## Action data model
 *
 * Action can be defined using following properties:
 *
 * | Property | Type | Description |
 * | ----- | ----- | ----- |
 * | source | `String` | Source of the data to extract from the request or response object. See below this table for detailed description. |
 * | action | `String` | Action to perform. Currently supported are: `assign-variable` -updates variable value in memory, without storing them to the datastore; `store-variable` - updates and stores variable value in the datastore.
 * | destination | `String` | For variables manipulation it is the variable name. |
 * | enabled | `Boolean` | If sent to false then the action is ignored. |
 *
 * ### Source option and data path
 *
 * With source string you can instruct the runner from where to take the value for
 * action. General structureath]
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
 * - query.[any string] - Returns the value of a query parameter. For `query.version` it would return `1`
 * - hash - Returns everything that is after the `#` character, e.g. `access_token=token&state=A6RT7W`
 * - hast.[any string] - It treats hash as a query parameters and returns the value of the parameter. For `hash.access_token` it would return `token`
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
 * Contains can operate on strings, simple arrays (e.g. `['test', 123]`) or objects (e.g. {'key':'value'}).
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
 * ### Styling
 * `<request-action-editor>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--request-action-editor` | Mixin applied to the element | `{}`
 * `--request-action-editor-closed-bar-height` | Height of the item when collapsed. | `48px`
 * `--request-action-editor-closed-info-color` | Color of the collapsed info label | `rgba(0, 0, 0, 0.87)`
 *
 * @memberof UiElements
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class RequestActionEditor extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      padding: 0 12px;
      margin: 12px 0;
      background-color: var(--request-action-editor-background-color, inherit);
      @apply --shadow-elevation-3dp;
      @apply --arc-font-body1;
      @apply --request-action-editor;
    }

    [hidden] {
      display: none !important;
    }

    header,
    .action-enabler,
    .iterator-enabler {
      @apply --layout-horizontal;
      @apply --layout-center;
    }

    header {
      height: var(--request-action-editor-closed-bar-height, 48px);
    }

    .form {
      padding-bottom: 12px;
    }

    .flex-spacer {
      @apply --layout-flex;
      @apply --layout-horizontal;
      @apply --layout-center;
      overflow: hidden;
    }

    .action-form {
      @apply --layout-horizontal;
      @apply --layout-wrap;
    }

    .source-type {
      margin-right: 8px;
    }

    .source-path {
      min-width: 320px;
      margin-right: 8px;
      @apply --layout-flex;
    }

    .destination {
      min-width: 320px;
      @apply --layout-flex;
    }

    .enable-button {
      padding: 12px 0;
    }

    .source-main {
      margin-right: 8px;
    }

    .action-type {
      margin-right: 8px;
    }

    .short-info {
      @apply --arc-font-body1;
      font-size: 15px;
      color: var(--request-action-editor-closed-info-color, rgba(0, 0, 0, 0.87));
    }

    .source-label {
      margin-right: 20px;
    }

    .source-label,
    .action-label {
      @apply --paper-font-common-nowrap;
    }

    .bottom-acctions {
      @apply --layout-horizontal;
      @apply --layout-center;
    }

    paper-button[disabled] {
      background: none !important;
      color: var(--request-actions-panel-disabled-button-color, #a8a8a8) !important;
    }

    paper-button[raised][disabled] {
      background: var(--request-actions-panel-disabled-button-raised-color, #eaeaea) !important;
    }
    </style>
    <header>
      <template is="dom-if" if="[[opened]]">
        <span class="action-enabler">
          <paper-toggle-button class="enable-button" checked="{{action.enabled}}" disabled="[[readonly]]"></paper-toggle-button>
          Action [[_computeActionStateLabel(action.enabled)]]
        </span>
      </template>
      <span class="flex-spacer short-info">
        <template is="dom-if" if="[[!opened]]">
          <span class="source-label">[[action.source]]</span>
          <span class="action-label">[[_computeActionLabel(action.action)]]: [[action.destination]]</span>
        </template>
      </span>
      <span>
        <paper-button class="toggle-editor" on-click="toggleOpened">[[_computeToglePanelLabel(opened)]]</paper-button>
        <paper-button class="remove-action" on-click="remove" disabled="[[readonly]]">Remove action</paper-button>
      </span>
    </header>
    <iron-collapse opened="[[opened]]">
      <div class="form">
        <div class="action-form">
          <paper-dropdown-menu-light label="Source" dynamic-align="" class="source-main" disabled="[[readonly]]">
            <paper-listbox slot="dropdown-content" selected="{{source}}" attr-for-selected="value">
              <paper-item value="request">Request</paper-item>
              <paper-item value="response">Response</paper-item>
            </paper-listbox>
          </paper-dropdown-menu-light>
          <paper-dropdown-menu-light label="Type" dynamic-align="" class="source-type" disabled="[[readonly]]">
            <paper-listbox slot="dropdown-content" selected="{{sourceType}}" attr-for-selected="value">
              <paper-item value="url">Url</paper-item>
              <paper-item value="status">Status code</paper-item>
              <paper-item value="headers">Headers</paper-item>
              <paper-item value="body">Body</paper-item>
            </paper-listbox>
          </paper-dropdown-menu-light>
          <paper-input label="Path to data (optional)" value="{{sourcePath}}" class="source-path" hidden\$="[[_computePathHidden(sourceType)]]" disabled="[[readonly]]"></paper-input>
          <paper-dropdown-menu-light label="Action type" dynamic-align="" class="action-type" disabled="[[readonly]]">
            <paper-listbox slot="dropdown-content" selected="{{action.action}}" attr-for-selected="value">
              <paper-item value="assign-variable">Assign variable</paper-item>
              <paper-item value="store-variable">Store variable</paper-item>
            </paper-listbox>
          </paper-dropdown-menu-light>
          <paper-combobox label="Variable name" required="" auto-validate="" value="{{action.destination}}" class="destination" source="[[variablesSuggestions]]" disabled="[[readonly]]"></paper-combobox>
        </div>
        <template is="dom-if" if="[[action.conditions]]">
          <div class="conditions-form">
            <template is="dom-repeat" items="{{action.conditions}}">
              <request-condition-editor condition="{{item}}" on-remove-condition-item="_removeCondition" readonly="[[readonly]]"></request-condition-editor>
            </template>
          </div>
        </template>
        <div class="bottom-acctions">
          <paper-button class="add-condition" on-click="_appendCondition" disabled="[[readonly]]">Add condition</paper-button>
          <template is="dom-if" if="[[_renderIterator]]">
            <span class="iterator-enabler">
              <paper-toggle-button checked="{{action.hasIterator}}" data-action="iterable-toggle" disabled="[[readonly]]"></paper-toggle-button>
              Iterator [[_computeIteratorStateLabel(action.hasIterator)]]
            </span>
          </template>
        </div>
        <template is="dom-if" if="[[action.hasIterator]]">
          <request-action-iterator-editor iterator="{{action.iterator}}" readonly="[[readonly]]"></request-action-iterator-editor>
        </template>
      </div>
    </iron-collapse>
`;
  }

  static get is() {
    return 'request-action-editor';
  }
  static get properties() {
    return {
      /**
       * Definied action.
       */
      action: {
        type: Object,
        notify: true,
        observer: '_actionChanged'
      },
      /**
       * Value computed from the `action.source` property.
       * Binded to source input field.
       */
      source: String,
      /**
       * Value computed from the `action.source` property.
       * Binded to source type input field.
       */
      sourceType: String,
      /**
       * Value computed from the `action.source` property.
       * Binded to path input field.
       */
      sourcePath: String,
      /**
       * List of variables sugesstions to display in the combo box.
       */
      variablesSuggestions: Array,
      /**
       * True to open the editor view.
       */
      opened: {
        type: Boolean,
        value: false
      },
      _renderIterator: {
        type: Boolean,
        computed: '_computeRenderIterator(source,sourceType)'
      },
      /**
       * Renders the editor in read only mode
       */
      readonly: Boolean
    };
  }

  static get observers() {
    return [
      '_computeSourcePath(source,sourceType,sourcePath)',
      '_hasIteratorChanged(action.hasIterator)'
    ];
  }

  // Clears the path info.
  clear() {
    this.source = '';
    this.sourceType = '';
    this.sourcePath = '';
  }

  _actionChanged(action) {
    const hasSource = action && action.source;
    if (hasSource) {
      this._cancelSourceProcessing = true;
    }
    this.clear();
    if (hasSource) {
      this._cancelSourceProcessing = false;
      this._processSource(action.source);
    }
  }
  /**
   * Sets path info variables when action's source change.
   * @param {String} source Current source of the action.
   */
  _processSource(source) {
    if (this._cancelSourceProcessing) {
      return;
    }
    const parts = source.split('.');
    this.source = parts[0] || '';
    this.sourceType = parts[1] || '';
    this.sourcePath = parts.splice(2).join('.');
  }

  _computeSourcePath(source, sourceType, sourcePath) {
    if (this._cancelSourceProcessing) {
      return;
    }
    let path = source || '';
    if (sourceType) {
      path += '.' + sourceType;
    }
    if (sourcePath) {
      path += '.' + sourcePath;
    }
    this._cancelSourceProcessing = true;
    if (!this.action) {
      this.set('action', {source: path});
    } else {
      this.set('action.source', path);
    }
    this._cancelSourceProcessing = false;
  }
  /**
   * Dispatches the `remove-action-item` custom event so the panel can remove
   * the item from the list.
   */
  remove() {
    this.dispatchEvent(new CustomEvent('remove-action-item', {
      bubbles: false
    }));
  }
  // Computes if path input should be hidden.
  _computePathHidden(sourceType) {
    return sourceType === 'status';
  }
  // Handler for add condition button click.
  _appendCondition() {
    this.addCondition();
  }
  /**
   * Adds a condition to conditions list.
   *
   * @param {?Object} opts Optional model properties for the condition.
   */
  addCondition(opts) {
    if (!opts) {
      opts = {};
    }
    let model = {
      source: 'response.status',
      operator: 'equal',
      condition: 200,
      enabled: true
    };
    model = Object.assign(model, opts);
    if (!this.action) {
      this.action = {};
    }
    if (!this.action.conditions) {
      this.set('action.conditions', [model]);
    } else {
      this.push('action.conditions', model);
    }
  }
  /**
   * Handles delete of the condition.
   * @param {CustomEvent} e
   */
  _removeCondition(e) {
    const index = e.model.get('index');
    this.splice('action.conditions', index, 1);
  }
  // Computes label for the action state enabler toggle button.
  _computeActionStateLabel(enabled) {
    return enabled ? 'enabled' : 'disabled';
  }
  _computeIteratorStateLabel(enabled) {
    return enabled ? 'enabled' : 'disabled';
  }
  // Computes label for toggle editor state button.
  _computeToglePanelLabel(opened) {
    return opened ? 'Hide editor' : 'Show editor';
  }
  /**
   * Toggles opened state of the editor.
   */
  toggleOpened() {
    this.opened = !this.opened;
  }
  /**
   * Computes label for the action lable when collapsed.
   * @param {String} action Currently selected action.
   * @return {String} Label for the action id.
   */
  _computeActionLabel(action) {
    return action === 'assign-variable' ? 'Assign variable' : 'Store variable';
  }

  _hasIteratorChanged(enabled) {
    if (!enabled) {
      return;
    }
    if (this.action.iterator) {
      return;
    }
    this.set('action.iterator', {
      source: 'data.*.property',
      operator: 'equal',
      condition: ''
    });
  }

  _computeRenderIterator(source, sourceType) {
    if (source === 'response' && sourceType === 'body') {
      return true;
    }
    return false;
  }

  // /**
  //  * Dispatches the `remove-action-item` custom event so the panel can remove
  //  * the item from the list.
  //  */
  // remove() {
  //   this.dispatchEvent(new CustomEvent('remove-action-item', {
  //     bubbles: false
  //   }));
  // }
}
window.customElements.define(RequestActionEditor.is, RequestActionEditor);
