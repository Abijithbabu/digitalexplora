import { ArrowUpIcon } from "@heroicons/react/24/outline";
import styles from "./Leaderboard.module.css";
import getSymbolFromCurrency from "currency-symbol-map";

function Card({ data, title }) {
  return (
    <div
      className={`bg-white shadow-xl rounded-md overflow-hidden ${styles.leaderBoardCard}`}
    >
      <div className="title p-4 shadow-lg bg-gradient-to-br from-purple-700 to-purple-500">
        <h3 className="text-lg text-white font-bold text-center">{title}</h3>
      </div>
      <ul className="p-4">
        {data?.length > 0 ? (
          <>
            {data.map((person, index) => {
              return (
                <li key={index} className={styles.leader}>
                  <div className="flex items-center">
                    <img
                      src={
                        person.picture ? person.picture : "/img/no_image.jpg"
                      }
                      alt={person.referred}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4">
                      <h3 className="text-md font-bold">
                        {index === 0 && "👑"}
                        {person.referred}
                      </h3>
                      <p className={styles.points}>
                        2546 points
                        <span className="text-green-500 flex items-center ml-3">
                          <ArrowUpIcon className="w-3 h-3 font-bold" /> +2
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="sales">
                    <p className={styles.amount}>
                      {getSymbolFromCurrency("INR")}
                      {parseInt(person.referralEarned).toFixed(2)}
                    </p>
                  </div>
                </li>
              );
            })}
          </>
        ) : (
          <p className="text-center">No data found</p>
        )}
      </ul>
    </div>
  );
}

export default Card;
