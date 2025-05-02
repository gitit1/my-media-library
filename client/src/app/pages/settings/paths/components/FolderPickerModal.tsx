'use client';

import { useEffect, useState } from 'react';
import { BtnSize, BtnVariant, TypographyType } from '@types';
import { Button, Typography } from '@ui';
import { PathsService } from '@services';

interface FolderPickerModalProps {
	currentPath: string;
	setCurrentPath: (path: string) => void;
	isOpen: boolean;
	onClose: () => void;
	onSelect: (selectedPath: string) => void;
}

export default function FolderPickerModal({
	currentPath,
	setCurrentPath,
	isOpen,
	onClose,
	onSelect,
}: FolderPickerModalProps) {
	const [folderStack, setFolderStack] = useState<string[]>([]);
	const [folderOptions, setFolderOptions] = useState<string[]>([]);

	useEffect(() => {
		if (!isOpen) return;

		if (!currentPath) {
			PathsService.getDrives()
				.then((drives) => {
					setFolderOptions(drives);
				})
				.catch((err) => {
					console.error('Failed to fetch drives', err);
					setFolderOptions([]);
				});
		} else {
			PathsService.getFolders(currentPath)
				.then((folders) => {
					setFolderOptions(folders);
				})
				.catch((err) => {
					console.error('Failed to fetch folders:', err);
					setFolderOptions([]);
				});
		}
	}, [currentPath, isOpen]);

	return isOpen ? (
		<div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
			<div className="bg-white p-6 rounded shadow-lg w-[480px] max-h-[80vh] overflow-y-auto">
				<Typography type={TypographyType.H4}>
					Select a Folder
				</Typography>
				<Typography type={TypographyType.P} className="text-sm mb-2">
					Current Path:{' '}
					<span className="font-mono">{currentPath}</span>
				</Typography>
				<ul className="border rounded p-2 max-h-64 overflow-y-auto mb-4">
					{folderOptions.map((folder) => (
						<li key={folder}>
							<button
								className="text-blue-600 hover:underline text-sm"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									if (folder.endsWith(':\\')) {
										// Only drill into drive, do not select it
										setFolderStack((prev) => [
											...prev,
											currentPath,
										]);
										setCurrentPath(folder);
									} else {
										// Drill into folder as usual
										setFolderStack((prev) => [
											...prev,
											currentPath,
										]);
										setCurrentPath(folder);
									}
								}}
							>
								📁{' '}
								{folder.endsWith(':\\')
									? folder
									: folder.split('\\').pop()}
							</button>
						</li>
					))}
				</ul>

				<div className="flex justify-between gap-2">
					<Button
						size={BtnSize.Small}
						variant={BtnVariant.Secondary}
						disabled={folderStack.length === 0}
						onClick={() => {
							const newStack = [...folderStack];
							const last = newStack.pop();
							if (last !== undefined) {
								setCurrentPath(last);
								setFolderStack(newStack);
							} else {
								setCurrentPath('');
								setFolderStack([]);
							}
						}}
					>
						← Back
					</Button>

					<div className="flex gap-2">
						<Button
							size={BtnSize.Small}
							variant={BtnVariant.Outline}
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							size={BtnSize.Small}
							disabled={!currentPath}
							onClick={() => {
								onSelect(currentPath);
								onClose();
							}}
						>
							✅ Select this Folder
						</Button>
					</div>
				</div>
			</div>
		</div>
	) : null;
}
