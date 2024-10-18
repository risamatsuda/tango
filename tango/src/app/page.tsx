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
      <td>
        <input
          type="checkbox"
          checked={checkedTangoIds.includes(tango.id)}
          onChange={() => handleCheckboxChange(tango.id)}
        />
      </td>
      <td>{tango.word}</td>
      <td>{checkedTangoIds.includes(tango.id) ? '' : tango.reading}</td>
      <td>{checkedTangoIds.includes(tango.id) ? '' : tango.meaning}</td>
      <td>
      </td>
    </tr>
  ));

  return (
    <div className='App'>
      <section className='main'>
        <table>
          <tbody>
            {tangoRows}
          </tbody>
        </table>
      </section>
      <form onSubmit={handleAddTango}>
        <input
          type="text"
          placeholder="你好"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
        />
        <input
          type="text"
          placeholder="nǐ hǎo"
          value={newReading}
          onChange={(e) => setNewReading(e.target.value)}
        />
        <input
          type="text"
          placeholder="こんにちは"
          value={newMeaning}
          onChange={(e) => setNewMeaning(e.target.value)}
        />
        <button type="submit">追加</button>
      </form>
        <button className={styles.btn_01}>覚えた</button>
        <button className={styles.btn_02}>苦手</button>
        <button className={styles.btn_03}>削除</button>
    </div>
  );
}

export default App;