import CampFilters from './CampFilters.js';
import CampList from './CampList.js';
import { api } from './api.js';
const {
  useState,
  useEffect
} = React;

const Camps = () => {
  // Filters
  const [kinds, setKinds] = useState([]);
  const [langs, setLangs] = useState([]);
  useEffect(() => {
    fetch(`${api}/camps/kinds`).then(res => res.json()).then(({
      kinds
    }) => setKinds(kinds.map(kind => ({
      name: kind,
      active: false
    }))));
    fetch(`${api}/camps/langs`).then(res => res.json()).then(({
      langs
    }) => setLangs(langs.map(lang => ({
      name: lang,
      active: false
    }))));
  }, []);

  const toggle = (options, setOptions) => name => {
    // Is there a more efficient way to toggle an option?
    // I'm sure there is. by copilot btw 
    const target = options.find(k => k.name === name);
    const rest = options.filter(k => k.name !== name);
    setOptions([...rest, { ...target,
      active: !target.active
    }].sort((o1, o2) => o1.name > o2.name));
  };

  const toggleKind = toggle(kinds, setKinds);
  const toggleLang = toggle(langs, setLangs);

  const activeOptions = options => options.filter(o => o.active);

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CampFilters, {
    kinds: kinds,
    langs: langs,
    toggleKind: toggleKind,
    toggleLang: toggleLang
  }), /*#__PURE__*/React.createElement(CampList, {
    kinds: activeOptions(kinds),
    langs: activeOptions(langs)
  }));
};

const container = document.querySelector(".camps-wrapper");
ReactDOM.createRoot(container).render( /*#__PURE__*/React.createElement(Camps, null));