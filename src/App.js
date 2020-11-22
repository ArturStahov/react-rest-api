import React, { Component, Fragment } from 'react';
import ApiService from './service/ApiService';
import ArticleList from './components/ArticleList/ArticleList';
import Notification from './components/Notification/Notification';
import Spiner from './components/Spinner/Spinner';
import SerchForm from './components/SerchForm/SerchForm';

export default class App extends Component {
  state = {
    articles: [],
    loading: false,
    eror: null,
    serchFormValue: '',
    page: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.serchFormValue !== this.state.serchFormValue) {
      this.fethArticles();
    }
  }

  handlerSerchFormSubmit = query => {
    this.setState({
      articles: [],
      serchFormValue: query,
      page: 0,
    });
  };

  fethArticles = () => {
    this.setState({ loading: true });
    ApiService(this.state.serchFormValue, this.state.page)
      .then(hits => {
        this.setState(prevState => {
          return {
            articles: [...prevState.articles, ...hits],
            page: prevState.page + 1,
          };
        });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(eror => this.setState({ eror }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    console.log(this.state.articles);
    const { eror, articles, loading } = this.state;
    return (
      <Fragment>
        <SerchForm onSerch={this.handlerSerchFormSubmit} />
        {eror && <Notification message={`EROR:${eror.message}`} />}
        {articles.length > 0 && <ArticleList articles={articles} />}
        {loading && <Spiner message="...Loading" />}
        {articles.length > 0 && !loading && (
          <button type="button" onClick={this.fethArticles}>
            LoadMore
          </button>
        )}
      </Fragment>
    );
  }
}
