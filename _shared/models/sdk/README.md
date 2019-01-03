
### 2018-10-07
From now on, we copy the generated models we which to keep:
_shared/sdk/models -> _shared/models/sdk

We do this because some of the models gets generated once
and then hidden by server model-config.json.
When hidden, the previously generated models gets deleted
next time we generate SDK.

Copying exactly the files we need makes it clearer.
