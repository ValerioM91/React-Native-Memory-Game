import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TRecords } from "../types";
import { deleteStorageData, getStorageData, setStorageData } from "./storage";

interface Store {
  records: TRecords | null;
  updateRecords: (moves: number, time: number) => void;
  deleteRecords: () => void;
}

const RecordContext = createContext({} as Store);

export const RecordContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [records, setRecords] = useState<null | TRecords>(null);

  useEffect(() => {
    const getStorageRecords = async () => {
      const data = await getStorageData();
      setRecords(data);
    };
    getStorageRecords();
  }, []);

  const updateRecords = useCallback(
    (moves: number, time: number) => {
      if (
        !records ||
        (moves < records.movesRecord && time < records.timeRecord)
      ) {
        setRecords({ movesRecord: moves, timeRecord: time });
        setStorageData({ movesRecord: moves, timeRecord: time });
        return;
      }

      if (moves < records.movesRecord) {
        setStorageData({ movesRecord: moves, timeRecord: records.timeRecord });
        setRecords({ movesRecord: moves, timeRecord: records.timeRecord });
      }

      if (time < records.timeRecord) {
        setStorageData({ movesRecord: records.timeRecord, timeRecord: time });
        setRecords({ movesRecord: records.movesRecord, timeRecord: time });
      }
    },
    [records]
  );

  const deleteRecords = () => {
    setRecords(null);
    deleteStorageData();
  };

  return (
    <RecordContext.Provider value={{ records, updateRecords, deleteRecords }}>
      {children}
    </RecordContext.Provider>
  );
};

const useRecordContext = () => useContext(RecordContext);

export default useRecordContext;
