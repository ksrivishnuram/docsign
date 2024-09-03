import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const TouchPad = ({ onSave }) => {
  const sigCanvas = useRef(null);

  const clear = () => sigCanvas.current.clear();
  const save = async () => {
    if (sigCanvas.current.isEmpty()) {
      alert('Signature cannot be empty!');
      return;
    }

    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    try {
      await onSave({ signature: dataURL });
    } catch (error) {
      console.error('Error saving signature:', error);
    }
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigCanvas}
        penColor='black'
        canvasProps={{
          width: 500,
          height: 200,
          className: 'signature-canvas',
        }}
      />
      <div>
        <button onClick={clear}>Clear</button>
        <button onClick={save}>Save</button>
      </div>
    </div>
  );
};

export default TouchPad;
