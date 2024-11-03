export default function RestartButton({ INITIAL_STATE, dispatch }) {
  return (
    <div>
      <button
        onClick={() =>
          dispatch({
            type: "restart",
            payload: INITIAL_STATE,
          })
        }
        className="btn btn-ui"
      >
        Restart Quiz
      </button>
    </div>
  );
}
