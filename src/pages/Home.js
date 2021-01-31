import React from 'react'
import { Seo } from '../components';

export const Home = () => {
  return (
    <>
      <Seo pageTitle="Home" />
      <div className="mb-4">
        <h2>Overseer</h2>
        <hr className="solid" />
      </div>
      <p className="mb-4">React project created by Kamil Pierzchała, Marek Wica, Tomasz Ziebura.</p>
      <div className="mb-4">
        <h2>Application integration details</h2>
        <hr className="solid" />
      </div>
      <p>In order to integrate your application you can use predesign SDK created in PHP or implement your own HTTP client.</p>
      <p className="mb-4">Create a project, create your API key and start gathering data about errors appearing in your app</p>
      <div className="mb-4">
        <h2>Own application integration</h2>
        <hr className="solid" />
      </div>
      <p>Make a client which makes a <strong>POST</strong> reques to the url <strong>{process.env.REACT_APP_BACKEND_URL}/api/v1/error</strong> which includes a header with the API key: <strong> X-API-KEY:{`<Your api key>`}</strong> and with body:</p>
      <pre>
      {`
      {
        "exception_class": "App\\Exception\\OrderCreationException",
        "line": 46,
        "file": "some_path/home/test.php",
        "occurred_at": "1669554261",
        "stacktrace": [
          {
            "exception_class": "App\\Exception\\CriticalErrorException",
            "line": 46,
            "file": "some_path/home/test.php"
          }
        ]
      }
      `}
      </pre>
      <p>If the request is successful it will persist an error to your project.</p>
    </>
  )
}