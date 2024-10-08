import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import Modal from "react-modal";

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
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0)",
          },
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
        className="relative w-5 h-5 border"
        onClick={() => setOpen(true)}
        style={{ backgroundColor: color }}
      />
    </>
  );
};

export default ColorPicker;
