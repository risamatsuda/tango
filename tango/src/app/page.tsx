"use client";
import React, { useState } from 'react';
import styles from './Button.module.css';

type Vocabulary = {
  id: number;
  word: string;
  reading?: string;
  meaning: string;
  memorized: boolean;
  isWeak: boolean;
  deleteFlag: boolean;
}

const dummyTango: Vocabulary[] = [
  {
    id: 1,
    word: "离开",
    reading: "Líkāi",
    meaning: "離れる",
    memorized: false,
    isWeak: false,
    deleteFlag: false,
  },
  {
    id: 2,
    word: "不善于",
    reading: "bù shànyú",
    meaning: "苦手だ",
    memorized: false,
    isWeak: false,
    deleteFlag: false,
  },
  {
    id: 3,
    word: "水池子",
    reading: "shuǐchízi",
    meaning: "水たまり",
    memorized: false,
    isWeak: false,
    deleteFlag: false,
  }
];


const App = () => {
  const [displaySwitchTangoIds, setDisplaySwitchTangoIds] = useState<number[]>([]);

  const handleRowClick = (id: number) => {
    setDisplaySwitchTangoIds(prev => 
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const tangoRows = dummyTango.map(tango => (
    <tr key={tango.id} onClick={() => handleRowClick(tango.id)}>
      <td>{tango.word}</td>
      <td>{displaySwitchTangoIds.includes(tango.id) ? '' :tango.reading}</td>
      <td>{displaySwitchTangoIds.includes(tango.id) ? '' :tango.meaning}</td>
    </tr>
  ));


  return(
    <section>
      <img src="./src/images/tango.logo.png" alt="Logo" className="logo" />
      <div className='App'>
        <section className='main'>{tangoRows}</section>
      </div>
        <button className={styles.btn_01}>覚えた</button>
        <button className={styles.btn_02}>苦手</button>
        <button className={styles.btn_03}>削除</button>
    </section>
  );
}

export default App;