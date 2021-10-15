# Milestone 1 - Local State and Data Fetching with React Hooks

All new React components are function components.

## Create an HTML select component with React
The new `Select` component was created by copying the elements built inside
the existing `buildSelect()` function of `DashboardShell.js`.

The new React component makes an HTML select highly reusable by other components by
parameterizing the _id_ and _label_ so that multiple selects can appear on the same
rendered page, and parameterizing the _options_ and _onChange_ listener so that menu option values
can be passed externally.

All properties are validated using React `PropTypes`.

## Create a new React component from scratch for data fetching
The new `DataFetch` component encapsulates the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
global method for fetching resources across the network and then displaying the (mainly) temporal data
result as a list (a sequence of data points).

The DataFetch component expects and _endpoint_ property which is a network path to a resource.
A React `PropTypes` validator (a required string) for the _endpoint_ is also provided.

It uses the `useEffect` Hook to fetch the data pointed to by the endpoint, at
component mount and update (when the endpoint changes). The side effect being the data saved internally for display.

The component uses local state to cache either the dataset being retrieved
or an error when trying to fetch the data.

```javascript
export default function DataFetch ({ endpoint }) {

  const [dataset, setDataset] = useState([]),
    [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    fetch(endpoint)
      .then(data => data.json())
      .then(json => {
        setErrorMessage(undefined);
        setDataset(json);
      })
      .catch(error => {
        setDataset([]);
        setErrorMessage(error.message);
      });
  }, [endpoint]);
  
  ...
}
```

Depending on whether the data fetch succeeded the list of data points is shown, otherwise
the error message is displayed instead.

## Use a container component to combine select and data fetching
A container component, `SelectDataFetch`, combines the `Select` and `DataFetch` components
described above, for the purposes of allowing a user to select the data-points to chart.

The `Select` component is used to display two options: `Sales` or `Subscriptions`
which determine the _endpoint_ (URIs) to use to fetch the data points. When a selection is made by the user, the container 
updates its local state with the new endpoint, and that in turn renders the list
of data that gets fetched by the `DataFetch` component.

When in _development_ mode a mock API is used to fetch the data from the dataset 
that are generated from a local resource file (`mocks\index.js`). The mock API is
implemented by [Mirage JS](https://miragejs.com/).
