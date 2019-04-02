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
import '../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../@advanced-rest-client/arc-icons/arc-icons.js';
import '../../@polymer/paper-input/paper-input.js';
import '../../@polymer/paper-toggle-button/paper-toggle-button.js';
import '../../@polymer/paper-dropdown-menu/paper-dropdown-menu-light.js';
import '../../@polymer/paper-listbox/paper-listbox.js';
import '../../@polymer/paper-item/paper-item.js';
import './condition-operator-dropdown.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
/**
 * An editor for request / response editors.
 * It creates data model that is accetable in ARC elements ecosystem for conditions.
 *
 * ### Data model
 *
 * Condition data model is:
 *
 * ```javascript
 * {
 *   source: 'String', // See below for detailed description.
 *   operator: 'String', // see below for list of all operators
 *   condition: 'any' // value to use to compare the value get from the action `source` property
 * }
 * ```
 *
 * #### source
 *
 * Instructs the condition runner from where to take the value for the condition.
 * General structure is:
 *
 * ```
 * source object . data type [. path]
 * ```
 *
 * Source object can be either `request` or `response`.
 *
 * Data type describes type of the request / response data. Can be one of:
 *
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
 * #### operator
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
 *   conditions: [{
 *     source: 'response.status',
 *     operator: 'equal',
 *     condition: 200
 *   }]
 * }
 * ```
 *
 * ### Example
 * ```
 * <request-condition-editor condition="{{condition}}"></request-condition-editor>
 * ```
 *
 * ### Styling
 * `<request-condition-editor>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--request-condition-editor` | Mixin applied to the element | `{}`
 * `--request-condition-editor-background-color` | Background color of the editor | `#fff`
 * `--inline-fom-action-icon-color` | Color of the delete icon | `rgba(0, 0, 0, 0.74)`
 * `--inline-fom-action-icon-color-hover` | Color of the delete icon when hovering | `--accent-color` or `rgba(0, 0, 0, 0.74)`
 *
 * @memberof UiElements
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class RequestConditionEditor extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      background-color: var(--request-condition-editor-background-color, #fff);
      padding: 12px;
      margin: 12px 0;
      @apply --arc-font-body1;
      @apply --request-condition-editor;
    }

    [hidden] {
      display: none !important;
    }

    .container {
      @apply --layout-horizontal;
      @apply --layout-start;
    }

    .form {
      @apply --layout-flex;
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

    .condition {
      min-width: 320px;
      @apply --layout-flex;
    }

    .enable-button {
      padding: 12px 0;
      margin-right: 8px;
    }

    .source-main {
      margin-right: 8px;
    }

    .condition-type {
      margin-right: 8px;
    }

    .delete-icon {
      color: var(--inline-fom-action-icon-color, rgba(0, 0, 0, 0.74));
      transition: color 0.2s linear;
    }

    .delete-icon:hover {
      color: var(--inline-fom-action-icon-color-hover, var(--accent-color, rgba(0, 0, 0, 0.74)));
    }
    </style>
    <div class="container">
      <paper-toggle-button class="enable-button" checked="{{condition.enabled}}" disabled="[[readonly]]"></paper-toggle-button>
      <div class="form">
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
        <condition-operator-dropdown class="condition-type" value="{{condition.operator}}" required="" readonly="[[readonly]]"></condition-operator-dropdown>
        <paper-input label="Condition value" required="" auto-validate="" value="{{condition.condition}}" class="condition" disabled="[[readonly]]"></paper-input>
      </div>
      <paper-icon-button class="delete-icon" icon="arc:close" on-click="remove" title="Remove condition"></paper-icon-button>
    </div>
`;
  }

  static get is() {
    return 'request-condition-editor';
  }
  static get properties() {
    return {
      /**
       * Definied condition.
       */
      condition: {
        type: Object,
        notify: true,
        observer: '_conditionChanged'
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
       * Renders the editor in read only mode
       */
      readonly: Boolean
    };
  }

  static get observers() {
    return ['_computeSourcePath(source,sourceType,sourcePath)'];
  }
  // Clears the path info.
  clear() {
    this.source = '';
    this.sourceType = '';
    this.sourcePath = '';
  }

  _conditionChanged(condition) {
    const hasSource = condition && condition.source;
    if (hasSource) {
      this._cancelSourceProcessing = true;
    }
    this.clear();
    if (hasSource) {
      this._cancelSourceProcessing = false;
      this._processSource(condition.source);
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
    this.set('condition.source', path);
    this._cancelSourceProcessing = false;
  }
  /**
   * Dispatches the `remove-action-item` custom event so the panel can remove
   * the item from the list.
   */
  remove() {
    this.dispatchEvent(new CustomEvent('remove-condition-item', {
      bubbles: false
    }));
  }
  // Computes if path input should be hidden.
  _computePathHidden(sourceType) {
    return sourceType === 'status';
  }
  /**
   * Non bubbling event notifying parent element that this condition is
   * to be deleted.
   * @event remove-condition-item
   */
}
window.customElements.define(RequestConditionEditor.is, RequestConditionEditor);
