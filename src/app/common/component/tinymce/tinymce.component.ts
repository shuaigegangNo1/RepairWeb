/**
 * Created by huangxuewen on 2018/4/24.
 */
import {
    Component,
    OnDestroy,
    AfterViewInit,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/image';
import 'tinymce/plugins/textcolor';


@Component({
    selector: 'app-tinymce',
    template: `<textarea #ta id="{{elementId}}"></textarea>`
})
export class TinymceComponent implements AfterViewInit, OnDestroy {
    @Input() elementId: String;
    @Output() onEditorKeyup = new EventEmitter<any>();
    @Input() initialContent: String;

    editor;

    ngAfterViewInit() {
        tinymce.init({
            selector: '#' + this.elementId,
            plugins: ['paste', 'image', 'textcolor'],
            branding: false,
            // language: "zh_CN",
            skin_url: '/assets/skins/lightgray',
            menubar: false,
            toolbar: "undo redo | styleselect | bold italic | forecolor backcolor | alignleft aligncenter alignright | link image",
            height: 300,
            setup: editor => {
                this.editor = editor;
                editor.on('init', () => {
                    editor.setContent(this.initialContent);
                });
                editor.on('change', () => {
                    const content = editor.getContent();
                    this.onEditorKeyup.emit(content);
                });
            },
        });
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }
}
