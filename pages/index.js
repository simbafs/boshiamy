import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
	const [keys, setKeys] = useState("");
	useEffect(() => {
		const keydownHandler = (e) => {
			console.log(e.keyCode);
			if (e.keyCode == 13) setKeys("");
			else setKeys((keys) => (keys += e.key));
		};
		document.addEventListener("keydown", keydownHandler);
		return () => {
			document.removeEventListener("keydown", keydownHandler);
		};
	}, []);
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
