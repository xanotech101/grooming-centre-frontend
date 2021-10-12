import { useEffect, useMemo, useRef, useState } from "react";

const useTimerCountdown = ({
  startDate: _startDate,
  endDate: _endDate,
  // duration
}) => {
  const [startDate, setStartDate] = useState();
  const endDate = useMemo(() => new Date(_endDate), [_endDate]);
  // const endDate = new Date(startDate.getTime() + duration * 60000); //TODO: remove
  const [startCountDown, setStartCountDown] = useState(false);
  const [hasTimeout, setHasTimeout] = useState(false);

  const nowTime = useMemo(() => new Date().getTime(), []);
  const endTime = useMemo(() => endDate?.getTime(), [endDate]);
  const startTime = useMemo(() => startDate?.getTime(), [startDate]);
  const [hasEnded, setHasEnded] = useState({
    elapsed: false,
    timeout: false,
    notYetTime: false,
  });

  // Checks if the assessment can be taken
  useEffect(() => {
    if (nowTime) {
      if (endTime && nowTime > endTime) {
        setHasEnded({ elapsed: true });
      }
      if (endTime && startTime > nowTime) {
        setHasEnded({ notYetTime: true });
      }
    }

    if (hasTimeout) {
      setHasEnded({ timeout: true });
    }
  }, [endTime, nowTime, hasTimeout, startTime]);

  // Initialize startDate
  useEffect(() => {
    if (_startDate) setStartDate(new Date(_startDate));
  }, [_startDate]);

  // Triggers countdown
  useEffect(() => {
    if (startDate && !hasEnded.elapsed && !hasEnded.timeout) {
      setStartCountDown(true);
    } else {
      setStartCountDown(false);
    }
  }, [hasEnded.elapsed, hasEnded.timeout, startDate]);

  const [timeLeft, setTimeLeft] = useState({});

  const getDateDifferenceInHHMMSS = (date1, date2) => {
    let distance = Math.abs(date1 - date2);
    const hours = Math.floor(distance / 3600000);
    distance -= hours * 3600000;
    const minutes = Math.floor(distance / 60000);
    distance -= minutes * 60000;
    const seconds = Math.floor(distance / 1000);

    return {
      hours: hours || "00",
      minutes: /an/i.test(("0" + minutes).slice(-2))
        ? "00"
        : ("0" + minutes).slice(-2),
      seconds: /an/i.test(("0" + seconds).slice(-2))
        ? "00"
        : ("0" + seconds).slice(-2),
    };
  };

  const timeLeftHMS = getDateDifferenceInHHMMSS(startDate, endDate);

  // Sets the state `timeLeft`
  useEffect(() => {
    setTimeLeft(timeLeftHMS);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeftHMS.hours, timeLeftHMS.minutes, timeLeftHMS.seconds]);

  const intervalIdRef = useRef();
  const handleStopCountdown = () => clearInterval(intervalIdRef.current);

  // Implements countdown
  useEffect(() => {
    if (startCountDown) {
      intervalIdRef.current = setInterval(() => {
        setStartDate((prev) => {
          if (
            +timeLeftHMS.hours === 0 &&
            +timeLeftHMS.minutes === 0 &&
            +timeLeftHMS.seconds - 1 === 0
          ) {
            setHasTimeout(true);
          }

          return new Date(prev.getTime() + 1000);
        });
      }, 1000);

      return () => handleStopCountdown();
    } else {
      handleStopCountdown();
    }
  }, [
    startCountDown,
    timeLeftHMS.hours,
    timeLeftHMS.minutes,
    timeLeftHMS.seconds,
  ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return {
    timeLeft,
    hasEnded,
    handleStopCountdown,
  };
};

export default useTimerCountdown;
