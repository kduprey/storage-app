import type { NextPage } from "next";
import { useRef, useState } from "react";
import Header from "../components/Header";

const Home: NextPage = () => {
	const [label, setLabel] = useState("Choose a file or files...");
	const [userUploads, setUserUploads] = useState(null as FileList | null);
	const fileInput = useRef<HTMLInputElement>(null);

	const onFilesChanged = (files: FileList | null) => {
		console.log(files);
		if (files) {
			setUserUploads(files);
			setLabel(
				files.length > 1
					? `${files.length} files selected`
					: files[0].name
			);
		}
	};

	return (
		<div className="font-display">
			<Header title="KD Transfer" description="Transfer files for free" />

			<main className="container h-screen p-6">
				<div className="flex flex-col items-center justify-center">
					<h1>KD Transfer</h1>
					<p>Transfer files for free</p>
				</div>

				<nav className=""></nav>

				<div>
					<h2>Upload your files here:</h2>
					<form
						action="/api/upload"
						method="post"
						encType="multipart/form-data"
					>
						<input
							type="file"
							name="file"
							id="file"
							ref={fileInput}
							className={`${
								userUploads
									? "inputfileSuccess"
									: "inputfileNone"
							} inputfile`}
							multiple
							onChange={(e) => onFilesChanged(e.target.files)}
						/>
						<label htmlFor="file">{label}</label>
						<button
							onClick={(e) => {
								e.preventDefault();
								setUserUploads(null);
								setLabel("Choose a file or files...");
								fileInput.current!.value = "";
							}}
						>
							Clear
						</button>
					</form>
				</div>
			</main>
		</div>
	);
};

export default Home;
