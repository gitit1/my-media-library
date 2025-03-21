'use client';

import { useState } from 'react';
import Button from '../shared/components/Button';
import Modal from '../shared/components/Modal';

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Test Modal">
        <p>This is a test modal! It should work with the theme.</p>
      </Modal>
    </div>
  );
};

export default TestPage;
