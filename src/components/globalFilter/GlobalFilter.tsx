import styles from './GlobalFilter.module.scss'

const GlobalFilter = ({ filter, setFilter }) => {
   return (
      <span className={styles.filter_container}>
         <input
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.input_filter}
            placeholder="Buscar..."
         />
      </span>
   );
};

export default GlobalFilter