import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface Store {
  movesRecord: number | null;
  timeRecord: number | null;
  updateMovesRecord: (moves: number) => void;
  updateTimeRecord: (time: number) => void;
}

const RecordContext = createContext({} as Store);

export const RecordContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [movesRecord, setMovesRecord] = useState<null | number>(null);
  const [timeRecord, setTimeRecord] = useState<null | number>(null);

  const updateMovesRecord = useCallback((moves: number) => {
    setMovesRecord((current) =>
      !current || moves < current ? moves : current
    );
  }, []);

  const updateTimeRecord = useCallback((time: number) => {
    setTimeRecord((current) => (!current || time < current ? time : current));
  }, []);

  return (
    <RecordContext.Provider
      value={{ movesRecord, timeRecord, updateMovesRecord, updateTimeRecord }}
    >
      {children}
    </RecordContext.Provider>
  );
};

const useRecordContext = () => useContext(RecordContext);

export default useRecordContext;
