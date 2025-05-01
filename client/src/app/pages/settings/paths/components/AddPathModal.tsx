'use client';

import { useState } from 'react';
import { BtnType, BtnVariant, BtnSize, TypographyType } from '@types';
import { Button, Modal, Typography } from '@ui';
import { PathsService } from '@services';
import FolderPickerModal from '@/app/pages/settings/paths/components/FolderPickerModal';

export default function AddPathModal() {
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({
		name: '',
		path: '',
		driveLetter: '',
		description: '',
		enabled: true,
	});
	const [showFolderPicker, setShowFolderPicker] = useState(false);

	const submitForm = async (e: any) => {
		e.preventDefault();
		try {
			await PathsService.add(form);
			setOpen(false);
			setForm({
				name: '',
				path: '',
				driveLetter: '',
				description: '',
				enabled: true,
			});
			window.location.reload();
		} catch (err) {
			console.error('Failed to save path', err);
		}
	};

	return (
		<>
			<Button onClick={() => setOpen(true)} className="mb-4">
				Add New Path
			</Button>

			<Modal onClose={() => setOpen(false)} isOpen={open}>
				<div className="p-4">
					<Typography type={TypographyType.H2} className="mb-4">
						Add New Path
					</Typography>

					<form className="space-y-4" onSubmit={submitForm}>
						<input
							type="text"
							placeholder="Path Name"
							className="w-full border p-2 rounded"
							value={form.name}
							onChange={(e) =>
								setForm({ ...form, name: e.target.value })
							}
						/>
						<Button
							variant={BtnVariant.Secondary}
							size={BtnSize.Small}
							onClick={() => {
								setShowFolderPicker(true);
								setForm({ ...form, path: '' }); // or setCurrentPath(null)
							}}
						>
							Browse Folders
						</Button>

						<FolderPickerModal
							isOpen={showFolderPicker}
							currentPath={form.path}
							setCurrentPath={(path) =>
								setForm({ ...form, path })
							}
							onSelect={(selectedPath) => {
								const match =
									selectedPath.match(/^([A-Z]):\\/i);
								setForm((prev) => ({
									...prev,
									path: selectedPath,
									driveLetter: match ? match[1] + ':' : '',
								}));
							}}
							onClose={() => setShowFolderPicker(false)}
						/>
						<input
							type="text"
							placeholder="Full Path"
							className="w-full border p-2 rounded"
							value={form.path}
							onChange={(e) => {
								const manualPath = e.target.value;
								setForm({ ...form, path: manualPath });

								// 🧠 Optional: auto-detect drive letter from manual input
								const match = manualPath.match(/^([A-Z]):\\/i);
								if (match) {
									setForm((prev) => ({
										...prev,
										path: manualPath,
										driveLetter: match[1] + ':',
									}));
								}
							}}
						/>
						<input
							type="text"
							placeholder="Drive Letter"
							className="w-full border p-2 rounded"
							value={form.driveLetter}
							onChange={(e) =>
								setForm({
									...form,
									driveLetter: e.target.value,
								})
							}
						/>
						<input
							type="text"
							placeholder="Description"
							className="w-full border p-2 rounded"
							value={form.description}
							onChange={(e) =>
								setForm({
									...form,
									description: e.target.value,
								})
							}
						/>
						<label className="flex items-center space-x-2">
							<input
								type="checkbox"
								checked={form.enabled}
								onChange={(e) =>
									setForm({
										...form,
										enabled: e.target.checked,
									})
								}
							/>
							<span>Enabled</span>
						</label>

						<Button type={BtnType.Submit} className="w-full">
							Save Path
						</Button>
					</form>

					<Button
						onClick={() => setOpen(false)}
						variant={BtnVariant.Outline}
						className="mt-4"
					>
						Cancel
					</Button>
				</div>
			</Modal>
		</>
	);
}
