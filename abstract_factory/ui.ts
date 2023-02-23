interface Button {
  render: () => void;
  onClick: () => void;
}

interface Input {
  render: () => void;
  onChange: () => void;
}

interface Paragraph {
  render: () => void;
}

export { Button, Input, Paragraph };
