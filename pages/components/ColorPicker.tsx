import { HexColorPicker } from "react-colorful";
import Modal from "react-modal";
import { useState } from "react";

type PropTypes = {
  color: string;
  onChange: (color: string) => void;
};

const ColorPicker = ({ color, onChange }: PropTypes) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: 20,
            backgroundColor: "transparent",
            border: "none",
          },
        }}
      >
        <HexColorPicker color={color} onChange={onChange} />
      </Modal>
      <button
        type="button"
        className="w-5 h-5 border rounded-full"
        onClick={() => setOpen(true)}
        style={{ backgroundColor: color }}
      />
    </>
  );
};

export default ColorPicker;
