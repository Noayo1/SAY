export default function ArrowIcon({ direction = "diagonal", className = "" }) {
  const paths = { diagonal: "M5 19 19 5M5 5h14v14", down: "M12 4v16m-7-7 7 7 7-7", up: "M12 20V4m-7 7 7-7 7 7" };
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[direction] || paths.diagonal} /></svg>;
}
