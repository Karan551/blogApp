import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { conf } from "../conf/config";

export default function MyRTE() {
    return (
        <section className='w-full my-2'>
            <Editor
            
                apiKey={conf.tinyMceApiKey}
                init={{
                    selector: "textarea",
                    placeholder: "Type Here...",
                    plugins: ['advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
                        'searchreplace', 'table', 'wordcount', 'preview', 'media', 'pagebreak', 'fullscreen', 'emoticons', 'code', 'codesample', 'insertdatetime', 'charmap',],

                    toolbar: ' blocks | fontfamily|fontsizeinput|alignleft aligncenter alignright alignjustify|bold italic underline strikethrough |forecolor backcolor | bullist numlist outdent indent ',
                    height: 400,
                    width: 900,
                    menubar: true,
                    link_default_target: '_blank',
                    branding: false,
                    resize: 'both',
                    mobile: {
                        menubar: true
                    },

                    font_size_input_default_unit: "px",
                    statusbar: false,



                }}
            />
        </section>
    );
}
