/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   request-variable-editor.html
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../iron-flex-layout/iron-flex-layout.d.ts" />
/// <reference path="../arc-icons/arc-icons.d.ts" />
/// <reference path="../paper-input/paper-input.d.ts" />
/// <reference path="../paper-toggle-button/paper-toggle-button.d.ts" />
/// <reference path="../paper-icon-button/paper-icon-button.d.ts" />
/// <reference path="../paper-combobox/paper-combobox.d.ts" />

declare namespace UiElements {

  /**
   * Variable editor allows to edit variables in actions editor.
   *
   * ### Styling
   *
   * `<request-variable-editor>` provides the following custom properties and
   * mixins for styling:
   *
   * Custom property | Description | Default
   * ----------------|-------------|----------
   * `--request-variable-editor` | Mixin applied to the element | `{}`
   */
  class RequestVariableEditor extends Polymer.Element {

    /**
     * Definied action.
     */
    action: object|null|undefined;

    /**
     * List of variables sugesstions to display in the combo box.
     */
    variablesSuggestions: any[]|null|undefined;

    /**
     * Renders the editor in read only mode
     */
    readonly: boolean|null|undefined;

    /**
     * Dispatches the `remove-action-item` custom event so the panel can remove
     * the item from the list.
     */
    remove(): void;
  }
}

interface HTMLElementTagNameMap {
  "request-variable-editor": UiElements.RequestVariableEditor;
}
