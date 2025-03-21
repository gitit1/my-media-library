'use client';

import { useState } from 'react';
import Button from '../shared/components/Button';
import Modal from '../shared/components/Modal';
import Card from '../shared/components/Card';

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Test Modal">
        <p>This is a test modal! It should work with the theme.</p>
      </Modal>

      <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {/* Card without an image */}
        <Card title="Test Card">
          <p>This is a sample card. It should match the theme and hover effect should work!</p>
        </Card>

        {/* Card with an image */}
        <Card
          title="Card with Image"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuv9k29YsGJxdI95Fn6Bx6lh_3MYcikQyvRw&s"
        >
          <p>This card includes an image and should scale properly!</p>
        </Card>
      </div>
    </div>
  );
};

export default TestPage;
