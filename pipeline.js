let process = (stages) => {
    return stages.reduce(pipelineReducer, true); 
}

const pipelineReducer = (accumulator, current) => accumulator && current();

exports.process = process;