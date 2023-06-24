import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPodcasts } from "../../features/podcast/podcastSlice";

const Header = () => {
  const status = useSelector((state) => state.podcast.status);
  const dispatch = useDispatch();
  return (
    <section className='header'>
      <nav>
        <div className='nav-area'>
          <a href='/' alt='Incio'>
            Podcaster
          </a>
          {status === "loading" && <span data-testid='loader'>Loading</span>}
        </div>
        <div className='search-area form-group'>
          <label htmlFor=''>100</label>
          <input
            type='text'
            name='input-search'
            className=''
            onChange={(e) => dispatch(filterPodcasts(e.target.value))}
          />
        </div>
      </nav>
    </section>
  );
};

export default Header;
