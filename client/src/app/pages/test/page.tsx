'use client';

import { useState } from 'react';

import Modal from '../../shared/ui/blocks/Modal';
import Button from '@/app/shared/ui/elements/Button';
import Card from '@/app/shared/ui/blocks/Card';

const TestPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div style={{ padding: '2rem' }}>
			<Button onClick={() => setIsOpen(true)}>Open Modal</Button>
			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Test Modal"
			>
				<p>This is a test modal! It should work with the theme.</p>
			</Modal>

			<div
				style={{
					marginTop: '2rem',
					display: 'grid',
					gap: '1rem',
					gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
				}}
			>
				{/* Card without an image */}
				<Card title="Basic Card">
					<p>This is a basic card without an image.</p>
				</Card>

				{/* Card with Image */}
				<Card
					title="Card with Image"
					image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv54yNV4g27Dz0fmNI4qWfzofq6cITIqENdA&s"
				>
					<p>This card includes an image. </p>
				</Card>

				{/* Clickable Card */}
				<Card
					title="Clickable Card"
					clickable
					onClick={() => alert('Card clicked!')}
					image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuaCPHZvXA8tqyRHDSn5E1ZuxW-h5ocCJcMQ&s"
				>
					<p>Clicking this card should trigger an event.</p>
				</Card>
			</div>
		</div>
	);
};

export default TestPage;
