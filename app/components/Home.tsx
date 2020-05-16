import React, { useState } from 'react';
import * as rrweb from 'rrweb';
import fs from 'fs';
import styles from './Home.css';
let replayer: rrweb.Replayer | null = {
  resume: () => {},
  pause: () => {},
};
export default function Home() {
  const [events, setEvents] = useState([]);
  // const [replayer, setReplayer] = useState({});
  return (
    <>
      <div>
        <input
          type="file"
          id="picker"
          className={styles.file}
          accept="application/json"
          onChange={async (e) => {
            const filelist = e.target.files;
            const file = filelist ? filelist[0] : null;
            if (file) {
              const data = await fs.readFileSync(file.path, { encoding: "utf8" });
              try {
                setEvents(JSON.parse(data));
              } catch(err) {
                throw new Error(err.message);
              }
            }
          }}
        />
        {events.length > 0 && (
          <div>
            <button
              type="button"
              className={styles.button}
              data-tid="stop"
              onClick={() => {
                replayer = new rrweb.Replayer(events, {
                  root: document.querySelector('#replay')
                });
                replayer.play();
              }}
            >
              回放录像
            </button>
          </div>
        )}
      </div>
      <div className={styles.replay} id="replay" />
    </>
  );
}

