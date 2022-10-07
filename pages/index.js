import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import encodeToChar from "../data/encodeToChar.json";

/**
 *  @param e {string} - char
 *  @returns {bool}
 */
function isAlphabet(e) {
	return !e.ctrlKey && !e.altKey && e.keyCode >= 65 && e.keyCode <= 90;
}

/**
 *  @param encode {string}
 *  @returns {string[]}
 */
function getCandidate(encode) {
	if (!encode) return [""];
	encode = encode?.toLowerCase();
	let candidate = Object.keys(encodeToChar)
		.map((item) => (item.startsWith(encode) ? encodeToChar[item] : null))
		.flat()
		.filter((i) => i)
		.filter((i, item) => item <= 10);
	return candidate || [""];
}

export default function Home() {
	const [keys, setKeys] = useState("");
	const [candidate, setCandidate] = useState([""]);
	const [text, setText] = useState("");

	useEffect(() => {
		const keydownHandler = (e) => {
			// console.log(e);
			switch (e.key) {
				case "Enter":
					setKeys("");
					break;
				case "Delete":
					setKeys("");
					setText("");
					break;
				case "Backspace":
					if (keys.length === 0) setText((text) => text?.slice(0, -1));
					setKeys((keys) => keys?.slice(0, -1));
					break;
				default:
					if (isAlphabet(e)) setKeys((keys) => (keys + e.key).toUpperCase());
					break;
			}
		};
		document.addEventListener("keydown", keydownHandler);
		return () => document.removeEventListener("keydown", keydownHandler);
	}, []);

	useEffect(() => {
		setCandidate(getCandidate(keys));
	}, [keys]);

	useEffect(() => {
		const keydownHandler = (e) => {
			// console.log(e)
			if (e.key !== " " && (e.key < "0" || e.key > "9")) return;
			e.preventDefault();

			setText(
				(text) => text + (candidate[e.key === " " ? 0 : e.key - 1] || "")
			);
			setKeys("");
		};
		document.addEventListener("keydown", keydownHandler);
		return () => document.removeEventListener("keydown", keydownHandler);
	}, [candidate]);

	return (
		<div className={styles.container}>
			<Head>
				<title>Boshiamy Exercise</title>
				<meta name="description" content="嘸蝦米打字練習" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>嘸蝦米打字練習</h1>

				<p className={styles.description}>互動式打字練習</p>

				<h1 className={styles.title}>{keys}</h1>
				<p className={styles.description}>{candidate}</p>
				<h1 className={styles.title}>{text}</h1>

				<div className={styles.grid}>
					<div className={styles.card}>
						<span>
							<kbd className={styles.kbd}>Space</kbd>選取第一個字
						</span>
					</div>
					<div className={styles.card}>
						<span>
							<kbd className={styles.kbd}>Delete</kbd>清空輸入的文字
						</span>
					</div>
					<div className={styles.card}>
						<span>
							<kbd className={styles.kbd}>Backspace</kbd>刪掉最後一個字
						</span>
					</div>
					<div className={styles.card}>
						<span>數字鍵選取其他候選字</span>
					</div>
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://github.com/simbafs/boshiamy-exercise"
					target="_blank"
					rel="noopener noreferrer"
				>
					Build by SimbaFs with &hearts;
				</a>
			</footer>
		</div>
	);
}
