"use client";
import React, { useState } from 'react';
import buttonStyles from './Button.module.css';
import styles from './Page.module.css';

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
    reading: "líkāi",
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
  const [checkedTangoIds, setCheckedTangoIds] = useState<number[]>([]);
  const [tangoList, setTangoList] = useState<Vocabulary[]>(dummyTango);
  const [newWord, setNewWord] = useState('');
  const [newReading, setNewReading] = useState('');
  const [newMeaning, setNewMeaning] = useState('');

  const handleCheckboxChange = (id: number) => {
    setCheckedTangoIds(prev => 
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const handleAddTango = (e: React.FormEvent) => {
    e.preventDefault();
    const newTango: Vocabulary = {
      id: tangoList.length + 1,
      word: newWord,
      reading: newReading,
      meaning: newMeaning,
      memorized: false,
      isWeak: false,
      deleteFlag: false,
    };
    setTangoList([...tangoList, newTango]);
    setNewWord('');
    setNewReading('');
    setNewMeaning('');
  };

  const tangoRows = tangoList.map(tango => (
    <tr key={tango.id}>
      <td width="50">
        <input
          type="checkbox"
          checked={checkedTangoIds.includes(tango.id)}
          onChange={() => handleCheckboxChange(tango.id)}
        />
      </td>
      <td width="250">{tango.word}</td>
      <td width="250">{checkedTangoIds.includes(tango.id) ? '' : tango.reading}</td>
      <td width="250">{checkedTangoIds.includes(tango.id) ? '' : tango.meaning}</td>
    </tr>
  ));

  return (
   <div>
    <div>
    <img src="/tango.logo.png" alt="ロゴ" style={{ width: '100px', height: '100px' }} />
    </div>
    <div className='App'>
      <section className='main'>
        <table className={styles.table}>
          <tbody>
            {tangoRows}
          </tbody>
        </table>
      </section>
      <form className={styles.form} onSubmit={handleAddTango}>
        <input
          className={styles.formItem}
          type="text"
          placeholder="你好"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
        />
        <input
          className={styles.formItem}
          type="text"
          placeholder="nǐ hǎo"
          value={newReading}
          onChange={(e) => setNewReading(e.target.value)}
        />
        <input
          className={styles.formItem}
          type="text"
          placeholder="こんにちは"
          value={newMeaning}
          onChange={(e) => setNewMeaning(e.target.value)}
        />
        <button className={buttonStyles.btn_02} type="submit">追加</button>
      </form>
        <button className={buttonStyles.btn_01}>覚えた</button>
        <button className={buttonStyles.btn_02}>苦手</button>
        <button className={buttonStyles.btn_03}>削除</button>
    </div>
    <div>
      <button className={buttonStyles.btn_04}>覚えた単語</button>
      <button className={buttonStyles.btn_05}>苦手な単語</button>
    </div>
    </div>
  );
}

export default App;