import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import encodeToChar from "../data/encodeToChar.json";

/**
 *  @param c {string} - char
 *  @returns {bool}
 */
function isAlphabet(c) {
	return c >= 65 && c <= 90;
}

/**
 *  @param encode {string}
 *  @returns {string[]}
 */
function getCandidate(encode) {
	return encodeToChar[encode?.toLowerCase()] || [""];
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
				case "Delete":
					setKeys("");
					break;
				case "Backspace":
					setKeys((keys) => keys?.slice(0, -1));
					break;
				default:
					if (isAlphabet(e.keyCode))
						setKeys((keys) => (keys + e.key).toUpperCase());
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
			if (e.key !== " " || (e.key < "0" && e.key > "9")) return;
			e.preventDefault();
			setText((text) => text + candidate[0]);
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
				<h1 className={styles.title}>{candidate}</h1>
				<p className={styles.description}>{text}</p>
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
