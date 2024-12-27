'use client';
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
};

const dummyTango: Vocabulary[] = [
  {
    id: 1,
    word: '任何',
    reading: 'rènhé',
    meaning: 'どれでも',
    memorized: false,
    isWeak: false,
    deleteFlag: false,
  },
  {
    id: 2,
    word: '不善于',
    reading: 'bù shànyú',
    meaning: '苦手だ',
    memorized: false,
    isWeak: false,
    deleteFlag: false,
  },
  {
    id: 3,
    word: '水池子',
    reading: 'shuǐchízi',
    meaning: '水たまり',
    memorized: false,
    isWeak: false,
    deleteFlag: false,
  },
];

const App = () => {
  const [tangoList, setTangoList] = useState<Vocabulary[]>(dummyTango);
  const [allTangoList, setAllTangoList] = useState<Vocabulary[]>(dummyTango);
  const [checkedTangoIds, setCheckedTangoIds] = useState<number[]>([]);
  const [newWord, setNewWord] = useState('');
  const [newReading, setNewReading] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [showReadings, setShowReadings] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [showMeanings, setShowMeanings] = useState<{ [key: number]: boolean }>(
    {},
  );

  //ロゴクリックでリロード
  const handleLogoClick = () => {
    window.location.reload();
  };

  //単語にチェックを入れる
  const handleCheckboxChange = (id: number) => {
    setCheckedTangoIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  //単語追加
  const handleAddTango = (e: React.FormEvent) => {
    e.preventDefault();
    const newTango: Vocabulary = {
      id: allTangoList.length + 1,
      word: newWord,
      reading: newReading,
      meaning: newMeaning,
      memorized: false,
      isWeak: false,
      deleteFlag: false,
    };
    setAllTangoList([...allTangoList, newTango]);
    setTangoList(
      [...allTangoList, newTango].filter((tango) => tango.memorized === false),
    );
    setNewWord('');
    setNewReading('');
    setNewMeaning('');
  };

  //単語一覧
  const tangoRows = tangoList.map((tango) => (
    <tr key={tango.id}>
      <td width="50">
        <input
          type="checkbox"
          checked={checkedTangoIds.includes(tango.id)}
          onChange={() => handleCheckboxChange(tango.id)}
        />
      </td>
      <td width="250">{tango.word}</td>
      <td width="250" onClick={() => toggleReading(tango.id)}>
        {showReadings[tango.id] ? '' : tango.reading}
      </td>
      <td width="250" onClick={() => toggleMeaning(tango.id)}>
        {showMeanings[tango.id] ? '' : tango.meaning}
      </td>
    </tr>
  ));

  //覚えた単語を登録
  const handleMemorized = () => {
    const updatedTangoList = allTangoList.map((tango) => {
      if (checkedTangoIds.includes(tango.id)) {
        return {
          ...tango,
          memorized: true,
          isWeak: false,
        };
      }
      return tango;
    });
    setAllTangoList(updatedTangoList);
    setTangoList(updatedTangoList.filter((tango) => tango.memorized === false));
    setCheckedTangoIds([]);
  };

  //苦手な単語を登録
  const handleWeak = () => {
    const updatedTangoList = allTangoList.map((tango) => {
      if (checkedTangoIds.includes(tango.id)) {
        return {
          ...tango,
          isWeak: true,
        };
      }
      return tango;
    });
    setAllTangoList(updatedTangoList);
    setTangoList(updatedTangoList.filter((tango) => tango.memorized === false));
    setCheckedTangoIds([]);
  };

  //単語を削除
  const handleDeleteTango = () => {
    const updatedTangoList = allTangoList.filter(
      (tango) => !checkedTangoIds.includes(tango.id),
    );
    setAllTangoList(updatedTangoList);
    setTangoList(updatedTangoList.filter((tango) => tango.memorized === false));
    setCheckedTangoIds([]);
  };

  //覚えた単語を表示
  const handleMemorizedTango = () => {
    setTangoList(allTangoList.filter((tango) => tango.memorized === true));
  };

  //苦手な単語を表示
  const hundleWeakTango = () => {
    setTangoList(allTangoList.filter((tango) => tango.isWeak === true));
  };

  //全ての単語を表示
  const handleShowAllTango = () => {
    setTangoList(allTangoList);
  };

  //発音の表示/非表示を切り替える
  const toggleReading = (id: number) => {
    setShowReadings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  //意味の表示/非表示を切り替える
  const toggleMeaning = (id: number) => {
    setShowMeanings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="container">
      {/* ロゴ画像を表示 */}
      <div>
        <img
          src="/tango.logo.png"
          alt="ロゴ"
          style={{ width: '100px', height: '100px' }}
          onClick={handleLogoClick}
        />
      </div>
      <div className="App">
        <section className="main">
          <table className={styles.table}>
            <tbody>{tangoRows}</tbody>
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
          <button className={buttonStyles.btn_02} type="submit">
            追加
          </button>
        </form>
        <button className={buttonStyles.btn_01} onClick={handleMemorized}>
          覚えた
        </button>
        <button className={buttonStyles.btn_02} onClick={handleWeak}>
          苦手
        </button>
        <button className={buttonStyles.btn_03} onClick={handleDeleteTango}>
          削除
        </button>
      </div>
      <div>
        <button className={buttonStyles.btn_04} onClick={handleMemorizedTango}>
          覚えた単語
        </button>
        <button className={buttonStyles.btn_05} onClick={hundleWeakTango}>
          苦手な単語
        </button>
      </div>
      <div>
        <button className={buttonStyles.btn_06} onClick={handleShowAllTango}>
          全ての単語
        </button>
      </div>
    </div>
  );
};

export default App;
