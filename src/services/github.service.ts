import { Octokit } from 'octokit';
import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const getRepoDetails = async (owner: string, repo: string) => {
  const { data } = await octokit.rest.repos.get({
    owner,
    repo,
  });
  return data;
};

export default octokit;
