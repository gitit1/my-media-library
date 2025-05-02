'use client';

import { useState } from 'react';
import { BtnType, BtnVariant, BtnSize, TypographyType, Path } from '@types';
import { Button, Modal, Typography } from '@ui';
import { PathsService } from '@services';
import FolderPickerModal from './FolderPickerModal';

interface PathModalProps {
	mode: 'add' | 'edit';
	initialData?: Path;
	onClose: () => void;
}

export default function PathModal({
	mode,
	initialData,
	onClose = () => {},
}: PathModalProps) {
	const [form, setForm] = useState<Path>({
		id: initialData?.id ?? 0,
		name: initialData?.name ?? '',
		path: initialData?.path ?? '',
		driveLetter: initialData?.driveLetter ?? '',
		description: initialData?.description ?? '',
		enabled: initialData?.enabled ?? true,
		createdAt: initialData?.createdAt ?? '',
		updatedAt: initialData?.updatedAt ?? '',
	});

	const [showFolderPicker, setShowFolderPicker] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			if (mode === 'edit') {
				await PathsService.update(form.id, form);
			} else {
				await PathsService.add(form);
			}
			onClose();
			window.location.reload(); // TODO: replace with shared state update
		} catch (err) {
			console.error('Failed to save path:', err);
		}
	};

	return (
		<>
			<Modal isOpen onClose={onClose}>
				<div className="p-4">
					<Typography type={TypographyType.H2} className="mb-4">
						{mode === 'edit' ? 'Edit Path' : 'Add New Path'}
					</Typography>

					<form className="space-y-4" onSubmit={handleSubmit}>
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
								setForm({ ...form, path: '' });
								setShowFolderPicker(true);
							}}
						>
							Browse Folders
						</Button>

						<FolderPickerModal
							isOpen={showFolderPicker}
							currentPath={form.path}
							setCurrentPath={(path) =>
								setForm((prev) => ({ ...prev, path }))
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
								const match = manualPath.match(/^([A-Z]):\\/i);
								setForm((prev) => ({
									...prev,
									path: manualPath,
									driveLetter: match ? match[1] + ':' : '',
								}));
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
							placeholder="Optional Description"
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

						<Button
							type={BtnType.Submit}
							className="w-full"
							disabled={showFolderPicker}
						>
							{mode === 'edit' ? 'Save Changes' : 'Save Path'}
						</Button>
					</form>

					<Button
						onClick={onClose}
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
