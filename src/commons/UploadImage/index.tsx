import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
export default function UploadImage() {
  const [ImageSelected, setImageSelected] = useState(null);

  const UPLOAD_IMAGE = gql`
    mutation singleUpload($file: Upload) {
      singleUpload(file: $file)
    }
  `;

  const [addAll, { data }] = useMutation(UPLOAD_IMAGE);

  return (
    <div>
      <h2>Cambiar imagén</h2>
      <input
        type="file"
        name="image"
        onChange={(e) => { console.info(e.target.files[0]); setImageSelected(e.target.files[0]) }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          addAll({ variables: { file: ImageSelected } });
        }}
      >
        Save image
      </button>
    </div>
  );
}