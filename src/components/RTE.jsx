import React from 'react';
import { conf } from "../conf/config";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";



export default function RTE({ label, name, control, defaultValue = "" }) {

    return (
        <section className="w-full my-2 ">

            {label && <label className="inline-block text-lg md:text-2xl mb-1 pl-1">{label}</label>}


            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        apiKey={conf.tinyMceApiKey}
                        init={{
                            selector: "textarea",
                            placeholder: "Write Your Content Here...",
                            plugins: ['advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
                                'searchreplace', 'table', 'wordcount', 'preview', 'media', 'pagebreak', 'fullscreen', 'emoticons', 'code', 'codesample', 'insertdatetime', 'charmap',],

                            toolbar: ' blocks | fontfamily|fontsizeinput|alignleft aligncenter alignright alignjustify|bold italic underline strikethrough |forecolor backcolor | bullist numlist outdent indent ',
                            // height: "100%",
                            width: "100%",
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
                        onEditorChange={onChange}
                    />
                )}


            />



        </section>
    );
}
